import React, { useEffect, useState } from "react";
import { useTable } from "react-table";
import {
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  Col,
  Input,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Table,
} from "reactstrap";
import Loading from "../Loading";
import NoDataFound from "../NoDataFound";
import styles from "./DataTable.module.scss";

function DataTable({
  columns,
  data,
  paginationConfig,
  setPaginationConfig,
  count,
  isPagination = false,
  loading,
  initialState = {},
  tableFooter,
  title,
  subtitle,
}) {
  // Use the state and functions returned from useTable to build your UI
  const [pages, setPages] = useState([]);
  const pageSizes = [10, 20, 50, 100];
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
      initialState: {
        pageIndex: paginationConfig?.page,
        pageSize: paginationConfig?.limit,
        ...initialState,
      },
    });

  useEffect(() => {
    let x = Math.ceil(count / paginationConfig?.limit);
    let arr = [];
    for (let i = 0; i < x; i++) {
      arr.push(i + 1);
    }
    if (arr.length === 0) {
      arr.push(1);
    }
    if (x > 5) {
      if (
        paginationConfig.page === 1 ||
        paginationConfig.page === 2 ||
        paginationConfig.page === 3
      ) {
        let pageArr = [];
        for (let index = 0; index < 5; index++) {
          pageArr.push(index + 1);
        }
        setPages(pageArr);
      } else if (
        paginationConfig.page === arr.length - 1 ||
        paginationConfig.page === arr.length - 2 ||
        paginationConfig.page === arr.length - 3 ||
        paginationConfig.page > arr.length - 1
      ) {
        let pageArr = [];
        for (let index = arr.length - 5; index < arr.length; index++) {
          pageArr.push(index + 1);
        }
        setPages(pageArr);
      } else {
        let pageArr = [];
        for (
          let index =
            paginationConfig.page - 3 <= 0 ? 1 : paginationConfig.page - 3;
          index < paginationConfig.page + 2;
          index++
        ) {
          pageArr.push(index + 1);
        }
        setPages(pageArr);
      }
    } else {
      setPages(arr);
    }
  }, [count, paginationConfig]);
  // Render the UI for your table

  useEffect(() => {
    if((paginationConfig.page > Math.ceil(count / paginationConfig?.limit) && paginationConfig.page !== 1)) {
      setPaginationConfig(prev => ({...prev, page: 1}))
    }
  },[paginationConfig])

  if (!loading && !count) {
    return <NoDataFound />;
  }

  return (
    <React.Fragment>
      <Card>
        <CardBody>
          {title && <CardTitle tag="h5">{title}</CardTitle>}
          {subtitle && (
            <CardSubtitle className="mb-2 text-muted" tag="h6">
              {subtitle}
            </CardSubtitle>
          )}

          {loading ? (
            <Loading />
          ) : (
            <Table
              className="no-wrap mt-3 align-middle"
              responsive
              borderless
              {...getTableProps()}
            >
              <thead>
                {headerGroups.map((headerGroup, index) => (
                  <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                    {headerGroup.headers.map((column) => (
                      <th
                        {...column.getHeaderProps({
                          style: {
                            minWidth: column.minWidth,
                            width: column.width,
                            textAlign: column.textAlign,
                          },
                        })}
                        key={column.id}
                      >
                        {column.render("Header")}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                  prepareRow(row);
                  return (
                    <tr
                      className="border-top"
                      {...row.getRowProps()}
                      key={row.id}
                    >
                      {row.cells.map((cell, index) => {
                        return (
                          <td
                            {...cell.getCellProps({
                              style: {
                                minWidth: cell.column.minWidth,
                                width: cell.column.width,
                                textAlign: cell.column.textAlign,
                                textTransform: cell.column.textTransform,
                              },
                            })}
                            key={index}
                          >
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
              {tableFooter && <tfoot>{tableFooter}</tfoot>}
            </Table>
          )}
          {isPagination && (
            // <Card className="border-0">
            // <CardBody>
            <Row className={`${styles.pagination_row} mt-3`}>
              <Col xl={6} md={6} sm={12} xs={12} className="d-flex justify-content-center justify-content-md-start justify-content-sm-center">
                <Pagination
                  size="sm"
                  aria-label="Page navigation example"
                  className={styles.pagination_container}
                >
                  <PaginationItem
                    disabled={paginationConfig.page === 1}
                    onClick={() => {
                      setPaginationConfig({
                        ...paginationConfig,
                        page: 1,
                      });
                    }}
                  >
                    <PaginationLink first />
                  </PaginationItem>
                  <PaginationItem disabled={paginationConfig.page === 1}>
                    <PaginationLink
                      onClick={() => {
                        setPaginationConfig({
                          ...paginationConfig,
                          page: paginationConfig.page - 1,
                        });
                      }}
                      previous
                    />
                  </PaginationItem>
                  {paginationConfig.page > 3 && (
                    <PaginationItem disabled active={false}>
                      <PaginationLink>...</PaginationLink>
                    </PaginationItem>
                  )}

                  {pages.map((page) => (
                    <PaginationItem
                      key={page}
                      onClick={() => {
                        setPaginationConfig({
                          ...paginationConfig,
                          page: page,
                        });
                      }}
                      active={page === paginationConfig.page}
                    >
                      <PaginationLink>{page}</PaginationLink>
                    </PaginationItem>
                  ))}

                  {paginationConfig.page <
                    (Math.ceil(count / paginationConfig?.limit) - 3) && (
                    <PaginationItem disabled active={false}>
                      <PaginationLink>...</PaginationLink>
                    </PaginationItem>
                  )}
                  <PaginationItem
                    disabled={paginationConfig.page === pages[pages.length - 1]}
                  >
                    <PaginationLink
                      onClick={() => {
                        setPaginationConfig({
                          ...paginationConfig,
                          page: paginationConfig.page + 1,
                        });
                      }}
                      next
                    />
                  </PaginationItem>
                  <PaginationItem
                    disabled={paginationConfig.page === pages[pages.length - 1]}
                    onClick={() => {
                      setPaginationConfig({
                        ...paginationConfig,
                        page: pages[pages.length - 1],
                      });
                    }}
                  >
                    <PaginationLink last />
                  </PaginationItem>
                </Pagination>
              </Col>
              <Col
                xl={{ offset: 3, size: 3 }}
                md={{ offset: 2, size: 4 }}
                xs={{ offset: 0, size: 12 }}
                className="d-flex justify-content-end align-items-center"
              >
                <p className="mb-0">Show</p>
                <Input
                  id="exampleSelect"
                  className={styles.limit}
                  name="select"
                  type="select"
                  onChange={(e) =>
                    setPaginationConfig({
                      ...paginationConfig,
                      limit: e.target.value,
                    })
                  }
                >
                  {pageSizes.map((pageSize) => (
                    <option value={pageSize} key={pageSize}>
                      {pageSize}
                    </option>
                  ))}
                </Input>
                <p className="mb-0">Rows</p>
              </Col>
            </Row>
            // </CardBody>
            // </Card>
          )}
        </CardBody>
      </Card>
    </React.Fragment>
  );
}

export default DataTable;
