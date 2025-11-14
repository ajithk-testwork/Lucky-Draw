import React, { useState } from 'react';
import { FaUsers, FaUtensils, FaGift, FaSearch, FaPrint, FaEdit, FaUserCircle, FaIdCard } from 'react-icons/fa';

const Dashboard = () => {
  // Sample data - replace with your actual data
  const dashboardData = {
    people: 150,
    food: "Food Distribution",
    gifts: 120,
    vegHandoverCount: 92,
    nonVegHandoverCount: 92
  };

  // Generate sample users data
  const generateUsers = () => {
    const users = [];
    for (let i = 1; i <= 300; i++) {
      users.push({
        id: i,
        name: `User ${i}`,
        userId: `B${String(i).padStart(3, '0')}`
      });
    }
    return users;
  };

  const [users] = useState(generateUsers());
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  // Filter users based on search term
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.userId.toLowerCase().includes(searchTerm.toLowerCase())
  );
     
  //    v vPagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handlePrint = (user) => {
    alert(`Printing details for ${user.name} (${user.userId})`);
  };

  const handleEdit = (user) => {
    alert(`Editing user: ${user.name} (${user.userId})`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Event Dashboard
            </h1>
            <p className="text-gray-600 mt-2 text-lg">Real-time overview of event metrics</p>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">Live Updates</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards - Horizontal Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* People Card with Circular Progress */}
        <div className="bg-gradient-to-br from-white to-blue-50 rounded-3xl p-6 shadow-2xl border border-blue-100 transform hover:scale-105 transition-all duration-300">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="p-4 bg-blue-500/20 rounded-2xl shadow-inner">
                    <FaUsers className="text-blue-600 text-2xl" />
                  </div>
                  <div>
                     <p className="text-blue-600 font-semibold text-lg">Total Attendees</p>
                    <h3 className="text-4xl font-bold text-gray-800 mt-1">{dashboardData.people}</h3>
                  </div>
                </div>

                {/* Circular Progress */}
                <div className="relative">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center">
                    <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#E5E7EB"
                        strokeWidth="3"
                      />
                      <path
                        d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="url(#blueGradient)"
                        strokeWidth="3"
                        strokeDasharray={`${(dashboardData.people / 200) * 100}, 100`}
                        className="transition-all duration-1000 ease-out"
                      />
                      <defs>
                        <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#3B82F6" />
                          <stop offset="100%" stopColor="#1D4ED8" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-bold text-blue-600">
                      {Math.min(100, (dashboardData.people / 200) * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-600 text-center">
                  Venue capacity • {dashboardData.people}/200
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Food Card with Animated Counters */}
        <div className="bg-gradient-to-br from-white to-green-50 rounded-3xl p-6 shadow-2xl border border-green-100 transform hover:scale-105 transition-all duration-300">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-4 bg-green-500/20 rounded-2xl shadow-inner">
                  <FaUtensils className="text-green-600 text-2xl" />
                </div>
                <div>
                  <p className="text-green-600 font-semibold text-lg">Food Distribution</p>
                  <h3 className="text-4xl font-bold text-gray-800 mt-1 animate-pulse">
                    {dashboardData.vegHandoverCount + dashboardData.nonVegHandoverCount}
                  </h3>
                </div>
              </div>

              {/* Food Distribution Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/80 rounded-2xl p-4 shadow-lg border border-green-200 transform hover:scale-105 transition-all duration-200">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-lg font-bold text-green-600">🥗</span>
                    </div>
                    <p className="text-2xl font-bold text-green-600">{dashboardData.vegHandoverCount}</p>
                    <p className="text-xs text-green-700 font-medium mt-1">Vegetarian</p>
                  </div>
                </div>
                <div className="bg-white/80 rounded-2xl p-4 shadow-lg border border-orange-200 transform hover:scale-105 transition-all duration-200">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-lg font-bold text-orange-600">🍗</span>
                    </div>
                    <p className="text-2xl font-bold text-orange-600">{dashboardData.nonVegHandoverCount}</p>
                    <p className="text-xs text-orange-700 font-medium mt-1">Non-Veg</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Gifts Card with Progress Bars */}
        <div className="bg-gradient-to-br from-white to-purple-50 rounded-3xl p-6 shadow-2xl border border-purple-100 transform hover:scale-105 transition-all duration-300">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-4 bg-purple-500/20 rounded-2xl shadow-inner">
                  <FaGift className="text-purple-600 text-2xl" />
                </div>
                <div>
                  <p className="text-purple-600 font-semibold text-lg">Gifts Distributed</p>
                  <h3 className="text-4xl font-bold text-gray-800 mt-1">{dashboardData.gifts}</h3>
                </div>
              </div>

              {/* Gift Progress */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-green-600 font-medium flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                      Delivered
                    </span>
                    <span className="text-gray-800 font-bold">{dashboardData.gifts}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${(dashboardData.gifts / dashboardData.people) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-orange-500 flex items-center">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                      Pending
                    </span>
                    <span className="text-gray-800 font-bold">{dashboardData.people - dashboardData.gifts}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-orange-400 to-orange-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${((dashboardData.people - dashboardData.gifts) / dashboardData.people) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500">
                  Completion: {((dashboardData.gifts / dashboardData.people) * 100).toFixed(1)}%
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Users Section */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="p-6 ">
          {/* Header */}
          <div className="flex flex-col lg:flex-row justify-between items-center mb-6">
            <div className="text-center lg:text-left">
              <h2 className="text-2xl font-bold text-gray-800">Participant Management</h2>
              <p className="text-gray-600 mt-1">Manage and track all event participants</p>
            </div>

            {/* Search */}
            <div className="relative mt-4 lg:mt-0">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search participants..."
                className="pl-10 pr-4 py-2.5 w-80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
          </div>

          {/* Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200/60 overflow-hidden">
  

  <div className="overflow-x-auto">
    <table className="w-full">
      <thead>
        <tr className="bg-gradient-to-r from-gray-50 to-gray-100/80 border-b border-gray-300/50">
          <th className="px-8 py-5 text-center">
            <div className="flex flex-col items-center space-y-1">
              <span className="text-xs font-bold text-gray-600 uppercase tracking-widest">Serial No</span>
              <div className="w-6 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
            </div>
          </th>
          <th className="px-8 py-5 text-center">
            <div className="flex flex-col items-center space-y-1">
              <span className="text-xs font-bold text-gray-600 uppercase tracking-widest">User Name</span>
              <div className="w-6 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
            </div>
          </th>
          <th className="px-8 py-5 text-center">
            <div className="flex flex-col items-center space-y-1">
              <span className="text-xs font-bold text-gray-600 uppercase tracking-widest">User ID</span>
              <div className="w-6 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
            </div>
          </th>
          <th className="px-8 py-5 text-center">
            <div className="flex flex-col items-center space-y-1">
              <span className="text-xs font-bold text-gray-600 uppercase tracking-widest">Actions</span>
              <div className="w-6 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
            </div>
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200/60">
        {currentUsers.length > 0 ? (
          currentUsers.map((user, index) => (
            <tr 
              key={user.id} 
              className="hover:bg-gradient-to-r hover:from-blue-50/30 hover:to-indigo-50/20 transition-all duration-200 group border-l-4 border-l-transparent hover:border-l-blue-500"
            >
              {/* Serial Number - Centered */}
              <td className="px-8 py-6 text-center">
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="w-7 h-7 flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl shadow-sm group-hover:from-blue-100 group-hover:to-blue-200 transition-all duration-300">
                      <span className="text-md font-bold text-slate-700">
                        {indexOfFirstUser + index + 1}
                      </span>
                    </div>
                  </div>
                </div>
              </td>
              
              {/* User Name - Centered */}
              <td className="px-8 py-6 text-center">
                <div className="flex flex-col items-center space-y-2">
                 
                  <div>
                    <p className="text-base font-semibold text-gray-900">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-500 mt-1 font-medium">
                      Registered User
                    </p>
                  </div>
                </div>
              </td>
              
              {/* User ID - Centered */}
              <td className="px-8 py-6 text-center">
                <div className="flex justify-center">
                  <div className="inline-flex items-center px-4 py-2.5 rounded-2xl bg-gradient-to-r from-slate-50 to-slate-100/80 border border-slate-300/50 shadow-sm group-hover:shadow group-hover:border-blue-300/50 transition-all duration-300">
                    <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full mr-3 shadow-sm"></div>
                    <code className="text-sm font-mono font-bold text-slate-800 tracking-wide">
                      {user.userId}
                    </code>
                  </div>
                </div>
              </td>
              
              {/* Actions - Centered */}
              <td className="px-6 py-4 text-center">
                <div className="flex justify-center space-x-3">
                  <button
                    onClick={() => handlePrint(user)}
                    className="inline-flex items-center px-5 py-2.5 border-2 border-slate-300 rounded-xl text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 hover:border-slate-400 hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-300 transform hover:-translate-y-0.5"
                  >
                    <FaPrint className="w-4 h-4 mr-2.5 text-slate-500" />
                    Print
                  </button>
                  <button
                    onClick={() => handleEdit(user)}
                    className="inline-flex items-center px-5 py-2.5 border-2 border-transparent rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform hover:-translate-y-0.5"
                  >
                    <FaEdit className="w-4 h-4 mr-2.5" />
                    Edit
                  </button>
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4" className="px-8 py-20 text-center">
              <div className="flex flex-col items-center justify-center max-w-md mx-auto">
                <div className="w-24 h-24 bg-gradient-to-br from-slate-100 to-slate-200 rounded-3xl flex items-center justify-center mb-6 shadow-inner">
                  <FaUserCircle className="text-slate-300 text-4xl" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">
                  No Participants Found
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed text-center">
                  We couldn't find any participants matching your search criteria. 
                  Try adjusting your search terms or check the filters.
                </p>
              </div>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>

  
</div>
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row justify-between items-center mt-6 pt-6 border-t border-gray-200 gap-4">
              <div className="text-sm text-gray-700 text-center sm:text-left">
                Showing <span className="font-medium">{indexOfFirstUser + 1}</span> to{" "}
                <span className="font-medium">{Math.min(indexOfLastUser, filteredUsers.length)}</span> of{" "}
                <span className="font-medium">{filteredUsers.length}</span> results
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>

                <div className="flex items-center space-x-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const pageNumber = i + 1;
                    return (
                      <button
                        key={pageNumber}
                        onClick={() => setCurrentPage(pageNumber)}
                        className={`inline-flex items-center justify-center w-8 h-8 text-sm font-medium rounded-md transition-colors ${currentPage === pageNumber
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-600 hover:bg-gray-100'
                          }`}
                      >
                        {pageNumber}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;