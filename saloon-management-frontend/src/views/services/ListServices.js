import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Card, CardBody, Input } from "reactstrap";
import ConfirmModal from "../../components/common/ConfirmModal";
import DataTable from "../../components/common/DataTable";
import PageHeader from "../../components/common/PageHeader";
import { getServicesRequest } from "../../redux/services/actions";
import { api, isActionPermitted } from "../../util";

const ListServices = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { services, count, loading } = useSelector((state) => state.services);
  const { permissions } = useSelector((state) => state.user);
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [paginationConfig, setPaginationConfig] = useState({
    page: 1,
    limit: 10,
    filter: {
      name: "",
    },
    sort: "name",
    // searchColumn: "name",
    // search: "",
  });

  useEffect(() => {
    if (isActionPermitted("services", "read", permissions)) {
      dispatch(getServicesRequest(paginationConfig));
    }
  }, [paginationConfig, permissions]);

  const deleteService = async (id) => {
    try {
      const response = await api.delete("/services/" + id);
      if (response.status === 200) {
        if (isActionPermitted("services", "read", permissions)) {
          dispatch(getServicesRequest(paginationConfig));
        }
        toast.success(response?.data?.message || response.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const onSearchChange = ({ target }) => {
    const { value } = target;
    const pc = paginationConfig;
    pc.filter.name = value;
    setPaginationConfig({ ...pc,  page: 1, limit: 10 });
  };

  return (
    <React.Fragment>
      <PageHeader title="Services" addBtnUrl="/services/add" />
      <Card>
        <CardBody>
          <Input
            value={paginationConfig.filter.name}
            type="search"
            placeholder="Search service"
            role="search"
            aria-roledescription="search for service"
            autoFocus
            onChange={onSearchChange}
          />
        </CardBody>
      </Card>
      <DataTable
        isPagination
        count={count}
        loading={loading}
        paginationConfig={paginationConfig}
        setPaginationConfig={setPaginationConfig}
        data={services}
        columns={[
          { Header: "Name", accessor: "name", width: "50%" },
          { Header: "Category", accessor: "Category.name", width: "40%" },
          {
            Header: "Actions",
            accessor: "actions",
            width: "20%",
            Cell: ({ row }) => {
              return (
                <div className="d-flex gap-2">
                  {isActionPermitted("services", "edit", permissions) && (
                    <Button
                      onClick={() => navigate(`/services/${row.original.id}`)}
                    >
                      <i className="bi bi-pencil-square"></i>
                    </Button>
                  )}
                  {isActionPermitted("services", "delete", permissions) && (
                    <Button
                      color="danger"
                      onClick={() => {
                        setDeleteId(row.original.id);
                        setShowDeleteModal(true);
                      }}
                    >
                      <i className="bi bi-trash"></i>
                    </Button>
                  )}
                </div>
              );
            },
          },
        ]}
      />

      {showDeleteModal && (
        <ConfirmModal
          isOpen={showDeleteModal}
          setIsOpen={setShowDeleteModal}
          onOk={() => deleteService(deleteId)}
          onCancel={() => {
            setDeleteId(null);
            setShowDeleteModal(false);
          }}
        />
      )}
    </React.Fragment>
  );
};

export default ListServices;
