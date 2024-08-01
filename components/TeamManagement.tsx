import { useQuery } from 'convex/react';
import { getTeamSchedule } from '../convex/functions';

const TeamManagement = () => {
  const teamSchedule = useQuery(getTeamSchedule);

  return (
    <div>
      <h1>Team Management</h1>
      <ul>
        {teamSchedule.map(schedule => (
          <li key={schedule.id}>
            {schedule.staffName} - {schedule.shift}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamManagement;