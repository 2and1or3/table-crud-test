import React, { useEffect } from 'react';
import Navbar from '../../Components/Navbar';
import Table from '../../Components/Table';
import { useAppDispatch, useAppSelector } from '../../Store';
import { rowsActions, rowsSelectors } from '../../Store/Slices/Row';

interface DashboardPageProps {
  className?: string;
}

const DashboardPage: React.FC<DashboardPageProps> = ( props ) => {
  const { className = '', } = props;
  const myClass = ['dashboard-page', ...className.split(' ')].join(' ');
  const rows = useAppSelector(rowsSelectors.selectAll);
  // const {projectId} = useParams();
  const projectId = 'projectId';
  const dispatch = useAppDispatch();

  useEffect(() => {
    // dispatch(rowsActions.fetchRowsByProjectId(projectId));
  }, [projectId, dispatch]);

  return (
    <main className={`${myClass} page`}>
      <Navbar/>
      <div className={'page__content'}>
        <div className={'dashboard-page__panel'}>
          <h3 className={'dashboard-page__title title3'}>Строительно-монтажные работы</h3>
        </div>
        <Table rows={rows}/>

      </div>
    </main>
  );
};

export default DashboardPage;
