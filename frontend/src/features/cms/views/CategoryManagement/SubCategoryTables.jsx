/* eslint-disable */

import React, { useState, useEffect, useRef } from 'react';
// react component for creating dynamic tables
import ReactTable from 'react-table';

// material-ui-icons
import AirplayIcon from 'material-ui-icons/Airplay';
import Dvr from 'material-ui-icons/Dvr';
import Close from 'material-ui-icons/Close';
import EditIcon from 'material-ui-icons/Edit';
// core components
import GridContainer from '@cmscomponents/Grid/GridContainer.jsx';
import ItemGrid from '@cmscomponents/Grid/ItemGrid.jsx';
import IconCard from '@cmscomponents/Cards/IconCard.jsx';
import IconButton from '@cmscomponents/CustomButtons/IconButton.jsx';
import SweetAlert from 'react-bootstrap-sweetalert';
import withStyles from 'material-ui/styles/withStyles';
import Button from '@cmscomponents/CustomButtons/Button.jsx';
import SubdirectoryArrowRightIcon from 'material-ui-icons/SubdirectoryArrowRight';
import sweetAlertStyle from '@cmsassets/jss/material-dashboard-pro-react/views/sweetAlertStyle.jsx';
import { useHistory } from 'react-router-dom';
import categoryApi from '@api/categoryApi';
function SubCategoryTables(props) {
  const history = useHistory();
  let editSub = useRef(null);
  let deleteSub = useRef(null);
  editSub.current = async (obj) => {
    try {
      history.push({
        pathname: '/manager/category/category-form/',
        state: {
          sub: {
            id: +obj.id,
            name: obj.name,
            code: obj.code,
            eng: obj.eng,
            parent: +obj.parent,
          },
          main: false,
        },
      });
    } catch (err) {
      alert('Không thể đổi trạng thái tài khoản');
    }
  };
  deleteSub.current = async (obj) => {
    warningWithConfirmAndCancelMessage(obj.id);
  };
  const listTables = (subCategoryTables) => {
    let list = [];

    for (let j = 0; j < subCategoryTables.length; j++) {
      list.push({
        title: subCategoryTables[j].title,
        data: subCategoryTables[j].dataRows.map((prop, key) => {
          return {
            r_id: key,
            id: prop[0],
            code: prop[1],
            name: prop[2],
            eng: prop[3],
            parent: prop[4],
            actions: (
              // we've added some custom button actions
              <div className="actions-right">
                {/* use this button to add a like kind of action */}
                <IconButton
                  onClick={async () => {
                    //let obj = state.data[j].data.find((o) => o.r_id === key);
                    await editSub.current({
                      id: prop[0],
                      code: prop[1],
                      name: prop[2],
                      eng: prop[3],
                      parent: prop[4],
                    });
                  }}
                  color="infoNoBackground"
                  customClass="like"
                >
                  <EditIcon />
                </IconButton>{' '}
                {/* use this button to add a edit kind of action */}
                <IconButton
                  onClick={() => {
                    let obj = { parent: prop[4], id: prop[0] };
                    history.push({
                      pathname: '/manager/courses',
                      state: {
                        maincat: obj.parent,
                        subcat: obj.id,
                      },
                    });
                  }}
                  color="warningNoBackground"
                  customClass="edit"
                >
                  <Dvr />
                </IconButton>{' '}
                {/* use this button to remove the data row */}
                <IconButton
                  onClick={async () => {
                    await deleteSub.current({
                      id: prop[0],
                      code: prop[1],
                      name: prop[2],
                      eng: prop[3],
                      parent: prop[4],
                    });
                    // var data = state.data[j].data;
                    // data.find((o, i) => {
                    //   if (o.r_id === key) {
                    //     data.splice(i, 1);
                    //     console.log(data);
                    //     return true;
                    //   }
                    //   return false;
                    // });
                    //check
                  }}
                  color="dangerNoBackground"
                  customClass="remove"
                >
                  <Close />
                </IconButton>{' '}
              </div>
            ),
          };
        }),
      });
    }
    return list;
  };
  const [state, setState] = useState({
    alert: null,
    show: false,
    data: [],
  });
  const deleteCategory = async (id) => {
    try {
      await categoryApi.deleteCategory(id);
      successDelete(id);
    } catch (err) {
      cancelDetele();
    }
  };
  const warningWithConfirmAndCancelMessage = (id) => {
    setState({
      ...state,
      alert: (
        <SweetAlert
          warning
          style={{ display: 'block', marginTop: '-100px' }}
          title="Xoá danh mục?"
          onConfirm={() => deleteCategory(id)}
          onCancel={() => hideAlert()}
          confirmBtnCssClass={
            props.classes.button + ' ' + props.classes.success
          }
          cancelBtnCssClass={props.classes.button + ' ' + props.classes.danger}
          confirmBtnText="Đồng ý"
          cancelBtnText="Từ chối"
          showCancel
        >
          Danh mục có chứa khoá học sẽ không thể xoá!
        </SweetAlert>
      ),
    });
    console.log(state);
  };
  const successDelete = (id) => {
    setState({
      ...state,
      alert: (
        <SweetAlert
          success
          style={{ display: 'block', marginTop: '-100px' }}
          title="Deleted!"
          onConfirm={() => {
            setTimeout(async function () {
              const resultTable = await categoryApi.subCategoryTableFill();
              setState({
                alert: null,
                show: false,
                data: listTables(resultTable),
              });
            }, 200);

            hideAlert();
          }}
          onCancel={() => hideAlert()}
          confirmBtnCssClass={
            props.classes.button + ' ' + props.classes.success
          }
        >
          Đã xoá danh mục ID:{id}.
        </SweetAlert>
      ),
    });
  };
  const cancelDetele = () => {
    setState({
      ...state,
      alert: (
        <SweetAlert
          danger
          style={{ display: 'block', marginTop: '-100px' }}
          title="Cancelled"
          onConfirm={() => hideAlert()}
          onCancel={() => hideAlert()}
          confirmBtnCssClass={
            props.classes.button + ' ' + props.classes.success
          }
        >
          Không thể xoá danh mục.
        </SweetAlert>
      ),
    });
  };
  const hideAlert = () => {
    setState({ ...state, alert: null });
  };
  useEffect(function () {
    setTimeout(async function () {
      const resultTable = await categoryApi.subCategoryTableFill();
      setState({
        alert: null,
        show: false,
        data: listTables(resultTable),
      });
    }, 200);
  }, []);
  return (
    <GridContainer>
      {state.alert}
      {state.data.map((item) => (
        <ItemGrid xs={12}>
          <IconCard
            icon={AirplayIcon}
            title={item.title}
            content={
              <div>
                <GridContainer justify="flex-end">
                  <ItemGrid>
                    <Button
                      color="primary"
                      onClick={() => {
                        history.push('/manager/category/category-form#subadd');
                      }}
                    >
                      <SubdirectoryArrowRightIcon />
                      Thêm danh mục
                    </Button>
                  </ItemGrid>
                </GridContainer>
                <GridContainer>
                  <ItemGrid xs={12}>
                    <ReactTable
                      data={item.data}
                      filterable
                      columns={[
                        {
                          Header: 'ID',
                          accessor: 'id',
                        },
                        {
                          Header: 'Mã danh mục',
                          accessor: 'code',
                        },
                        {
                          Header: 'Tên danh mục',
                          accessor: 'name',
                        },
                        {
                          Header: 'Tên tiếng anh',
                          accessor: 'eng',
                        },
                        {
                          Header: 'Hành động',
                          accessor: 'actions',
                          sortable: false,
                          filterable: false,
                        },
                      ]}
                      defaultPageSize={10}
                      showPaginationTop
                      showPaginationBottom={false}
                      className="-striped -highlight"
                    />
                  </ItemGrid>
                </GridContainer>
              </div>
            }
          />
        </ItemGrid>
      ))}
    </GridContainer>
  );
}
export default withStyles(sweetAlertStyle)(SubCategoryTables);
