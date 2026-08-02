import Doctor from '../doctor/doctor.model';
import Patient from '../patient/patient.model';

const getDashboardStatsFromDB = async () => {
  // 1. Basic Counts
  const totalDoctorsPromise = Doctor.countDocuments();
  const totalPatientsPromise = Patient.countDocuments();

  // 2. Patients per Doctor (Group by Doctor with aggregation)
  const patientsPerDoctorPromise = Patient.aggregate([
    {
      $group: {
        _id: '$doctorId',
        totalPatients: { $sum: 1 },
      },
    },
    {
      $lookup: {
        from: 'doctors', // Doctor collection name in DB
        localField: '_id',
        foreignField: '_id',
        as: 'doctor',
      },
    },
    {
      $unwind: '$doctor',
    },
    {
      $project: {
        _id: 1,
        totalPatients: 1,
        doctorName: '$doctor.name',
        specialization: '$doctor.specialization',
      },
    },
  ]);

  // 3. Date-based statistics (Patients registration grouped by Date/Month)
  const dateBasedPatientsPromise = Patient.aggregate([
    {
      $group: {
        _id: {
          $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } }, // Date-wise ascending sort for charts
    { $limit: 30 }, // Last 30 days
  ]);

  // Execute all queries concurrently for ultra-fast performance
  const [totalDoctors, totalPatients, patientsPerDoctor, dateBasedPatients] =
    await Promise.all([
      totalDoctorsPromise,
      totalPatientsPromise,
      patientsPerDoctorPromise,
      dateBasedPatientsPromise,
    ]);

  return {
    overview: {
      totalDoctors,
      totalPatients,
    },
    patientsPerDoctor,
    dateBasedPatients,
  };
};

export const statsService = {
  getDashboardStatsFromDB,
};