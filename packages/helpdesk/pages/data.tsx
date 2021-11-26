import { useLazyQuery, useMutation } from '@apollo/client';
import { useRouter } from 'next/dist/client/router';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import ChooseDateBar from '../components/ChooseDateBar';
import SideBar from '../components/SideBar';
import TicketReport from '../components/TicketReport';
import logoutIcon from '../public/logout-icon.png';
import extractTicketReportData from '../utils/extractTicketReportData';
import {
  deleteSessionMutation,
  employeeDataFetch,
  employeeSessionFetch,
  getTicketsInTimeFrameQuery,
  roleNameFetch,
} from '../utils/queries';
import { dataStyles } from '../utils/styles';
import { transformTimestampIntoDatetime2 } from '../utils/transformTimestampIntoDatetime';
import { DataProps, Employee, ReportData } from '../utils/types';
import useWindowDimensions from '../utils/useWindowDimensions';

export default function Data(props: DataProps) {
  const screenWidth = useWindowDimensions().width;
  const router = useRouter();
  const [reportData, setReportData] = useState<ReportData | {}>({});
  // default: october 12, 2020, 00:00:00:000 GMT + 2
  const [startDate, setStartDate] = useState(1602453600000);
  const [endDate, setEndDate] = useState(Date.parse(new Date().toDateString()));
  const [isAdmin, setIsAdmin] = useState(false);
  const [employee, setEmployee] = useState<Employee | {}>({});

  // validate sessionToken

  useEffect(() => {
    const apiUrl = 'https://bluejay-api.herokuapp.com/graphql';
    const validateSession = async () => {
      const employeeSessionFetchRes = await employeeSessionFetch(apiUrl);
      const employeeSessionFetchData = await employeeSessionFetchRes.json();
      console.log('employeeSessionFetchData: ', employeeSessionFetchData);

      // throw back to log-in here if there is no data.employeeSession

      if (!employeeSessionFetchData.data.employeeSession) {
        router.push('/');
      }

      // otherwise: get employeeId

      const employeeId =
        employeeSessionFetchData.data.employeeSession.employee_id;
      console.log('employeeId: ', employeeId);

      // and use it fetch the employee Data

      const employeeDataFetchRes = await employeeDataFetch(employeeId, apiUrl);
      const employeeDataFetchData = await employeeDataFetchRes.json();

      // then use the role id to fetch to name of that employee's role

      const roleNameFetchRes = await roleNameFetch(
        employeeDataFetchData.data.employee.role,
        apiUrl,
      );
      const roleNameFetchData = await roleNameFetchRes.json();

      // set state vars to the corresponding values

      setEmployee(employeeDataFetchData.data.employee);
      setIsAdmin(roleNameFetchData.data.role.role_name === 'admin');
    };

    validateSession();
  }, []);

  const [logOut] = useMutation(deleteSessionMutation, {
    onCompleted: () => {
      router.push('/');
    },
    fetchPolicy: 'network-only',
  });

  //

  const [getTicketsInTimeFrame, { data: getTicketsInTimeFrameData }] =
    useLazyQuery(getTicketsInTimeFrameQuery, {
      variables: {
        intervalStart: transformTimestampIntoDatetime2(startDate.toString()),
        // include the entirety of the last Date in the interval
        intervalEnd: transformTimestampIntoDatetime2(
          (endDate + 23 * 60 * 60 * 1000).toString(),
        ),
      },
      onCompleted: async () => {
        setReportData(
          await extractTicketReportData(
            getTicketsInTimeFrameData.ticketsByTimeFrame,
            startDate,
            endDate,
          ),
        );
      },
      fetchPolicy: 'network-only',
    });

  useEffect(() => {
    if (startDate && endDate) {
      getTicketsInTimeFrame();
    }
  }, [startDate, endDate, getTicketsInTimeFrame]);

  return (
    <SideBar
      setFilter={props.setFilter}
      filter={props.filter}
      employee={employee}
      isAdmin={isAdmin}
    >
      <main css={screenWidth && dataStyles(screenWidth)}>
        <div className="top-bar">
          <p style={{ color: 'white' }}>
            {employee && 'first_name' in employee && employee.first_name}
          </p>
          <button onClick={() => logOut()} data-cy="logout-button">
            <Image src={logoutIcon} alt="a stylized door with an arrow" />
          </button>
        </div>
        <div>
          <h1>Ticket Reports</h1>
          <ChooseDateBar
            getTicketsInTimeFrame={getTicketsInTimeFrame}
            reportData={reportData}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
          />
          <TicketReport
            reportData={reportData}
            startDate={startDate}
            endDate={endDate}
          />
        </div>
      </main>
    </SideBar>
  );
}
