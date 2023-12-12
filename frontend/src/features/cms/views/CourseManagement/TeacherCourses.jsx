/* eslint-disable*/
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
// material-ui components
import withStyles from 'material-ui/styles/withStyles';
import Tooltip from 'material-ui/Tooltip';
import Select from 'material-ui/Select';
import MenuItem from 'material-ui/Menu/MenuItem';
import InputLabel from 'material-ui/Input/InputLabel';
import FormControl from 'material-ui/Form/FormControl';
// material-ui-icons
import ArtTrack from 'material-ui-icons/ArtTrack';
import UpdateIcon from 'material-ui-icons/Update';
// core components
import Pagination from '@material-ui/lab/Pagination';
import GridContainer from '@cmscomponents/Grid/GridContainer.jsx';
import ItemGrid from '@cmscomponents/Grid/ItemGrid.jsx';
import Button from '@cmscomponents/CustomButtons/Button.jsx';
import HeaderCard from '@cmscomponents/Cards/HeaderCard.jsx';
import ImagePriceCard from '@cmscomponents/Cards/ImagePriceCard.jsx';
import CustomInput from '@cmscomponents/CustomInput/CustomInput.jsx';
import InputAdornment from 'material-ui/Input/InputAdornment';
import SearchIcon from 'material-ui-icons/Search';
import VpnLockIcon from 'material-ui-icons/VpnLock';
import Edit from 'material-ui-icons/Edit';
import dashboardStyle from '@cmsassets/jss/material-dashboard-pro-react/views/dashboardStyle';
import categoryApi from '@api/categoryApi';
import coursesApi from '@api/coursesApi';
import Close from 'material-ui-icons/Close';
import moment from 'moment';
function TeacherCourses(props) {
  const currentUser = useSelector(({ userReducer }) => userReducer?.user);
  let location = useLocation();
  const [state, setState] = useState({
    category: location.state
      ? location.state.maincat
        ? +location.state.maincat
        : ''
      : '',
    subcategory: location.state
      ? location.state.subcat
        ? +location.state.subcat
        : ''
      : '',
    search: '',
    listcategory: [],
    listsubcategory: [],
    data: [],
  });
  const [page, setPage] = useState({
    first: 0,
    last: 0,
    page: 1,
    totalCourses: 0,
    limit: 10,
  });

  const pageHandle = (event, value) => {
    setPage({
      ...page,
      page: value,
      first: value * page.limit - page.limit,
      last: value * page.limit - 1,
    });
  };
  const between = (x, min, max) => {
    return x >= min && x <= max;
  };
  useEffect(() => {
    setTimeout(async () => {
      try {
        const fetch_maincat = await categoryApi.getMain();
        let fetch_subcat = [];
        if (state.category !== '' && state.subcategory !== '') {
          fetch_subcat = await categoryApi.getSubCategoryByParentId(
            state.category
          );
        }
        const fetch_data = await coursesApi.getCoursesByTeacher(
          currentUser.userId
        );
        const fetchData = {
          category: state.category,
          subcategory: state.subcategory,
          listcategory: fetch_maincat.data,
          listsubcategory: state.subcategory !== '' ? fetch_subcat.data : [],
          search: '',
          data: fetch_data.data,
        };
        setState(fetchData);
        setPage({
          ...page,
          first: page.page * page.limit - page.limit,
          last: page.page * page.limit - 1,
          totalCourses: fetch_data.data.length,
          totalPages: Math.ceil(fetch_data.data.length / page.limit),
        });
      } catch (err) {
        console.log(err.message);
      }
    }, 200);
  }, []);
  const handleCategorySelect = async (event) => {
    const subdata = await categoryApi.getSubCategoryByParentId(
      event.target.value
    );
    setState({
      ...state,
      listsubcategory: subdata.data,
      subcategory: '',
      category: event.target.value,
    });
  };
  const handleSubCategorySelect = (event) => {
    setState({ ...state, subcategory: event.target.value });
  };
  const { classes } = props;
  return (
    <div>
      {console.log(state)}
      {console.log(page)}
      <GridContainer>
        <ItemGrid xs={12}>
          <HeaderCard
            cardTitle="Tìm kiếm khoá học"
            headerColor="rose"
            content={
              <div>
                <GridContainer>
                  <ItemGrid xs={12}>
                    <legend>Tìm kiếm theo danh mục</legend>
                  </ItemGrid>
                  <ItemGrid xs={6}>
                    <FormControl
                      fullWidth
                      className={classes.selectFormControl}
                    >
                      <InputLabel
                        htmlFor="category-select"
                        className={classes.selectLabel}
                      >
                        Chọn danh mục chính
                      </InputLabel>
                      <Select
                        MenuProps={{
                          className: classes.selectMenu,
                        }}
                        classes={{
                          select: classes.select,
                        }}
                        value={state.category}
                        onChange={handleCategorySelect}
                        inputProps={{
                          name: 'categorySelect',
                          id: 'category-select',
                        }}
                      >
                        <MenuItem
                          classes={{
                            root: classes.selectMenuItem,
                          }}
                          value=""
                        >
                          Tất cả
                        </MenuItem>
                        {state.listcategory.map((prop) =>
                          +prop.categoryid === state.category ? (
                            <MenuItem
                              classes={{
                                root: classes.selectMenuItem,
                                selected: classes.selectMenuItemSelected,
                              }}
                              value={+prop.categoryid}
                              selected={true}
                            >
                              {prop.name}
                            </MenuItem>
                          ) : (
                            <MenuItem
                              classes={{
                                root: classes.selectMenuItem,
                                selected: classes.selectMenuItemSelected,
                              }}
                              value={+prop.categoryid}
                            >
                              {prop.name}
                            </MenuItem>
                          )
                        )}
                      </Select>
                    </FormControl>
                  </ItemGrid>
                  <ItemGrid xs={6}>
                    <FormControl
                      fullWidth
                      className={classes.selectFormControl}
                    >
                      <InputLabel
                        htmlFor="subcategory-select"
                        className={classes.selectLabel}
                      >
                        Chọn danh mục phụ
                      </InputLabel>
                      <Select
                        MenuProps={{
                          className: classes.selectMenu,
                        }}
                        classes={{
                          select: classes.select,
                        }}
                        value={state.subcategory}
                        onChange={handleSubCategorySelect}
                        inputProps={{
                          name: 'subcategorySelect',
                          id: 'subcategory-select',
                        }}
                      >
                        <MenuItem
                          classes={{
                            root: classes.selectMenuItem,
                          }}
                          value=""
                        >
                          Tất cả
                        </MenuItem>
                        {state.listsubcategory.map((prop) =>
                          +prop.categoryid === state.subcategory ? (
                            <MenuItem
                              classes={{
                                root: classes.selectMenuItem,
                                selected: classes.selectMenuItemSelected,
                              }}
                              selected={true}
                              value={+prop.categoryid}
                            >
                              {prop.name}
                            </MenuItem>
                          ) : (
                            <MenuItem
                              classes={{
                                root: classes.selectMenuItem,
                                selected: classes.selectMenuItemSelected,
                              }}
                              value={prop.categoryid}
                            >
                              {prop.name}
                            </MenuItem>
                          )
                        )}
                      </Select>
                    </FormControl>
                  </ItemGrid>
                  <ItemGrid xs={12}>
                    <InputLabel></InputLabel>
                  </ItemGrid>
                  <ItemGrid xs={12}>
                    <legend>Tìm kiếm theo từ khoá</legend>
                  </ItemGrid>
                  <ItemGrid xs={12}>
                    <CustomInput
                      labelText="Nhập từ khoá"
                      id="search"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: 'text',
                        onChange: (e) =>
                          setState({ ...state, search: e.target.value }),
                        endAdornment: (
                          <InputAdornment
                            position="end"
                            className={classes.inputAdornment}
                          >
                            <SearchIcon
                              className={classes.inputAdornmentIcon}
                            />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </ItemGrid>
                </GridContainer>
              </div>
            }
          />
        </ItemGrid>
      </GridContainer>
      <br />
      <GridContainer>
        {state.data
          .filter((item) =>
            JSON.stringify(item)
              .toLowerCase()
              .includes(state.search.toLowerCase())
          )
          .map(function (item, index) {
            if (between(index, page.first, page.last)) {
              if (state.category === '' && state.subcategory === '') {
                return (
                  <ItemGrid xs={12} sm={12} md={4}>
                    <ImagePriceCard
                      image={item.imagePath}
                      title={item.title}
                      text={item.description}
                      price={item.status}
                      statIcon={UpdateIcon}
                      statText={item.updateddate}
                      hover
                      underImage={
                        <div>
                          <Tooltip
                            id="tooltip-top"
                            title="Xem"
                            placement="bottom"
                            classes={{ tooltip: classes.tooltip }}
                          >
                            <Link to={`/courses/detail/${item?.courseid}`}>
                              <Button color="defaultNoBackground" justIcon>
                                <ArtTrack className={classes.underChartIcons} />
                              </Button>
                            </Link>
                          </Tooltip>
                          <Tooltip
                            id="tooltip-top"
                            title="Edit"
                            placement="bottom"
                            classes={{ tooltip: classes.tooltip }}
                          >
                            <Link to={`/manager/edit-course/${item.courseid}`}>
                              <Button color="successNoBackground" justIcon>
                                <Edit className={classes.underChartIcons} />
                              </Button>
                            </Link>
                          </Tooltip>
                        </div>
                      }
                    />
                  </ItemGrid>
                );
              }
              if (
                state.category !== '' &&
                state.category === +item.parentid &&
                state.subcategory === ''
              ) {
                return (
                  <ItemGrid xs={12} sm={12} md={4}>
                    <ImagePriceCard
                      image={item.imagePath}
                      title={item.title}
                      text={item.description}
                      price={item.status}
                      statIcon={UpdateIcon}
                      statText={item.updateddate}
                      hover
                      underImage={
                        <div>
                          <Tooltip
                            id="tooltip-top"
                            title="Xem"
                            placement="bottom"
                            classes={{ tooltip: classes.tooltip }}
                          >
                            <Link to={`/courses/detail/${item?.courseid}`}>
                              <Button color="defaultNoBackground" justIcon>
                                <ArtTrack className={classes.underChartIcons} />
                              </Button>
                            </Link>
                          </Tooltip>
                          <Tooltip
                            id="tooltip-top"
                            title="Edit"
                            placement="bottom"
                            classes={{ tooltip: classes.tooltip }}
                          >
                            <Link to={`/manager/edit-course/${item.courseid}`}>
                              <Button color="successNoBackground" justIcon>
                                <Edit className={classes.underChartIcons} />
                              </Button>
                            </Link>
                          </Tooltip>
                        </div>
                      }
                    />
                  </ItemGrid>
                );
              } else if (
                state.subcategory !== '' &&
                item.categoryid === state.subcategory
              ) {
                return (
                  <ItemGrid xs={12} sm={12} md={4}>
                    <ImagePriceCard
                      image={item.imagePath}
                      title={item.title}
                      text={item.description}
                      price={item.status}
                      statIcon={UpdateIcon}
                      statText={item.updateddate}
                      hover
                      underImage={
                        <div>
                          <Tooltip
                            id="tooltip-top"
                            title="Xem"
                            placement="bottom"
                            classes={{ tooltip: classes.tooltip }}
                          >
                            <Link to={`/courses/detail/${item?.courseid}`}>
                              <Button color="defaultNoBackground" justIcon>
                                <ArtTrack className={classes.underChartIcons} />
                              </Button>
                            </Link>
                          </Tooltip>
                          <Tooltip
                            id="tooltip-top"
                            title="Edit"
                            placement="bottom"
                            classes={{ tooltip: classes.tooltip }}
                          >
                            <Button color="successNoBackground" justIcon>
                              <Edit className={classes.underChartIcons} />
                            </Button>
                          </Tooltip>
                        </div>
                      }
                    />
                  </ItemGrid>
                );
              }
              return <div></div>;
            }
          })}
      </GridContainer>
      <GridContainer>
        <ItemGrid xs={12} sm={12} md={4} />
        <ItemGrid xs={12} sm={12} md={4}>
          <Pagination
            count={page.totalPages}
            pages={page}
            onChange={pageHandle}
          />
        </ItemGrid>
      </GridContainer>
    </div>
  );
}

TeacherCourses.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(dashboardStyle)(TeacherCourses);
