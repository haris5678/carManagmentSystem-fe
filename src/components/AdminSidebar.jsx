const AdminSidebar = () => {
  return (
    <div
      className="bg-dark text-white p-3"
      style={{ width: "250px", overflowY: "auto" }}
    >
      <h3 className="mb-4">Admin Dashboard</h3>
      <ul className="list-unstyled">
        <li className="mb-3">
          <a
            href="/admin-dashboard"
            className="text-white text-decoration-none"
          >
            Dashboard
          </a>
        </li>
        <li className="mb-3">
          <a
            href="admin-dashboard/cars"
            className="text-white text-decoration-none"
          >
            Car
          </a>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
