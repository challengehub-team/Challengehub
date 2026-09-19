import {
  FaUserShield,
  FaUsersCog,
  FaShieldAlt,
  FaDatabase,
  FaLock,
  FaCogs,
  FaChartLine,
  FaComments,
} from "react-icons/fa";

const AdministrationPage = () => {
  const admins = [
    { role: "System Founder", icon: FaShieldAlt, color: "text-green-600" },
    { role: "Platform Architect", icon: FaCogs, color: "text-blue-600" },
    { role: "Head of Education System", icon: FaChartLine, color: "text-purple-600" },
    { role: "Community Coordination Unit", icon: FaComments, color: "text-pink-600" },
    { role: "Challenge Review Board", icon: FaUserShield, color: "text-green-700" },
    { role: "Feedback Analysis Team", icon: FaDatabase, color: "text-yellow-600" },
    { role: "Security & Integrity Unit", icon: FaLock, color: "text-red-600" },
    { role: "Competition Operations Desk", icon: FaUsersCog, color: "text-indigo-600" },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] pt-24 px-6">

      <div className="max-w-7xl mx-auto">

        {/* HERO HEADER */}
        <div className="text-center mb-12">

          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-5 py-2 rounded-full text-sm font-semibold mb-5">
            <FaUsersCog />
            Administration System
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-gray-900">
            ChallengeHub Control System
          </h1>

          <p className="text-gray-600 mt-4 max-w-2xl mx-auto leading-7">
            Anonymous operational units responsible for maintaining fairness,
            security, and performance across the platform.
          </p>
        </div>

        {/* SYSTEM WARNING */}
        <div className="mb-12 bg-white border border-green-100 rounded-3xl p-6 text-center shadow-sm">

          <div className="flex items-center justify-center gap-2 text-green-700 font-semibold">
            <FaShieldAlt />
            System Integrity Notice
          </div>

          <p className="text-sm text-gray-600 mt-2">
            All administrative identities are anonymized to ensure fairness,
            transparency, and platform security.
          </p>
        </div>

        {/* GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {admins.map((admin, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-100 rounded-[28px] p-8 text-center shadow-lg hover:-translate-y-2 transition-all"
            >

              {/* ICON */}
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gray-50 flex items-center justify-center mb-6">
                <admin.icon className={`text-3xl ${admin.color}`} />
              </div>

              {/* ROLE */}
              <h2 className="text-lg font-bold text-gray-900">
                {admin.role}
              </h2>

              {/* LABEL */}
              <p className="text-sm text-gray-500 mt-3">
                Classified Operational Unit
              </p>
            </div>
          ))}

        </div>

        {/* SYSTEM FOOTER */}
        <div className="mt-16 text-center">

          <div className="inline-block bg-white border border-gray-100 px-6 py-4 rounded-2xl shadow-sm">
            <p className="text-sm text-gray-500">
              ChallengeHub Administration System operates under secure anonymized governance protocols.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default AdministrationPage;