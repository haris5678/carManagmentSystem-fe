const CarDetailsModal = ({ car, onClose }) => {
  if (!car) return null; 

  return (
    <div
      className="modal d-block"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      }}
    >
      <div
        className="modal-dialog"
        style={{ maxWidth: "500px", margin: "10% auto" }}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Car Details</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <p>
              <strong>Model:</strong> {car.model}
            </p>
            <p>
              <strong>Make:</strong> {car.make}
            </p>
            <p>
              <strong>Year of Manufacture:</strong> {car.yearOfManufacture}
            </p>
            <p>
              <strong>Color:</strong> {car.color}
            </p>
            <p>
              <strong>Registration No:</strong> {car.registrationNo}
            </p>
            <p>
              <strong>Category:</strong> {car.category.name}
            </p>
            <p>
              <strong>Created By:</strong> {car.createdBy.firstName} (
              {car.createdBy.email})
            </p>
            <p>
              <strong>Created At:</strong>{" "}
              {new Date(car.createdAt).toLocaleString()}
            </p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailsModal;
