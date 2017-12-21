import 'core-js/fn/object/assign';
import JobStatus from './statuses';

const JobTypes = Object.assign({}, JobStatus, {
  EXPIRED: 'EXPIRED',
});

export default type => {
  switch (type) {
    case JobTypes.PENDING:
      return {
        status: JobStatus.PENDING,
        expired: false,
      };
    case JobTypes.EXPIRED:
      return {
        status: [JobStatus.APPROVED, JobStatus.PENDING],
        expired: true,
        limit: 1200,
      };
    case JobTypes.DRAFT:
      return {
        status: JobStatus.DRAFT,
        limit: 1200,
      };
    case JobTypes.APPROVED:
    default:
      return {
        status: JobStatus.APPROVED,
        expired: false,
      };
  }
}