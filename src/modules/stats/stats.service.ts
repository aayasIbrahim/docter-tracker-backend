import Doctor from '../doctor/doctor.model';
import Patient from '../patient/patient.model';

const getDashboardStatsFromDB = async () => {

  const totalDoctorsPromise = Doctor.countDocuments();
  const totalPatientsPromise = Patient.countDocuments();

  //  Patients per Doctor 
  const patientsPerDoctorPromise = Patient.aggregate([
    {
      $group: {
        _id: '$doctorId',
        totalPatients: { $sum: 1 },
      },
    },
    {
      $lookup: {
        from: 'doctors', 
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

  //  Date-based statistics 
  const dateBasedPatientsPromise = Patient.aggregate([
    {
      $group: {
        _id: {
          $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { _id:- 1 } }, 
    { $limit: 30 },
    { $sort: { _id: 1 } } // Last 30 days
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