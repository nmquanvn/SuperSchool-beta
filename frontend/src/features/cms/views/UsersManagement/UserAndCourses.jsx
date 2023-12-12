/* eslint-disable*/
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// material-ui components
import PermIdentity from 'material-ui-icons/PermIdentity';
import ProfileCard from '@cmscomponents/Cards/ProfileCard.jsx';
import withStyles from 'material-ui/styles/withStyles';
import Tooltip from 'material-ui/Tooltip';
import Select from 'material-ui/Select';
import MenuItem from 'material-ui/Menu/MenuItem';
import InputLabel from 'material-ui/Input/InputLabel';
import FormControl from 'material-ui/Form/FormControl';
import IconCard from '@cmscomponents/Cards/IconCard.jsx';
// material-ui-icons
import ArtTrack from 'material-ui-icons/ArtTrack';
import UpdateIcon from 'material-ui-icons/Update';
// core components
import { Link } from 'react-router-dom';
import Clearfix from '@cmscomponents/Clearfix/Clearfix.jsx';
import GridContainer from '@cmscomponents/Grid/GridContainer.jsx';
import ItemGrid from '@cmscomponents/Grid/ItemGrid.jsx';
import Button from '@cmscomponents/CustomButtons/Button.jsx';
import HeaderCard from '@cmscomponents/Cards/HeaderCard.jsx';
import ImagePriceCard from '@cmscomponents/Cards/ImagePriceCard.jsx';
import CustomInput from '@cmscomponents/CustomInput/CustomInput.jsx';
import InputAdornment from 'material-ui/Input/InputAdornment';
import SearchIcon from 'material-ui-icons/Search';
import PublicIcon from 'material-ui-icons/Public';
import EditIcon from 'material-ui-icons/Edit';
import VpnLockIcon from 'material-ui-icons/VpnLock';
import dashboardStyle from '@cmsassets/jss/material-dashboard-pro-react/views/dashboardStyle';
import categoryApi from '@api/categoryApi';
import coursesApi from '@api/coursesApi';
function UserAndCourse(props) {
  let location = useLocation();
  const dispatch = useDispatch();
  const currentUser = useSelector(({ userReducer }) => userReducer?.user);
  const history = useHistory();
  const [info, setInfo] = useState({
    id: location?.state?.userid ? location?.state?.userid : null,
    username: currentUser.username,
    fullname: location?.state?.fullname
      ? location?.state?.fullname
      : currentUser.username,
    email: location?.state?.email ? location?.state?.email : currentUser.email,
    phonenumber: '99999999',
    dob: 'Chưa cập nhật',
    reg: 'Chưa cập nhật',
    group: location?.state?.group
      ? location?.state?.group
      : currentUser.groupCode,
    groupid: location?.state?.groupid ? location?.state?.groupid : null,
    status: location?.state?.status
      ? location?.state?.status
      : 'Đang hoạt động',
    description: '',
  });
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

  const changePublish = (id, publish) => {
    coursesApi
      .changePublish(id, publish)
      .then((data) => console.log(data))
      .catch((err) => alert(err));
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
        let fetch_data = [];
        if (info.id !== null) {
          fetch_data = await coursesApi.getCoursesByTeacher(
            location.state.userid
          );
        }
        const fetchData = {
          category: state.category,
          subcategory: state.subcategory,
          listcategory: fetch_maincat.data,
          listsubcategory: state.subcategory !== '' ? fetch_subcat.data : [],
          search: '',
          data: fetch_data.data,
        };
        setState(fetchData);
      } catch (err) {
        alert(err.message);
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
      <GridContainer>
        <ItemGrid xs={12} sm={12} md={8}>
          <IconCard
            icon={PermIdentity}
            iconColor="rose"
            title="Thông tin cá nhân"
            category={` - ${info.group}`}
            content={
              <div>
                <GridContainer>
                  <ItemGrid xs={12} sm={12} md={4}>
                    <h5>Họ tên:</h5>
                  </ItemGrid>
                  <ItemGrid xs={12} sm={12} md={8}>
                    <h5>{info.fullname}</h5>
                  </ItemGrid>
                </GridContainer>
                <GridContainer>
                  <ItemGrid xs={12} sm={12} md={4}>
                    <h5>Email:</h5>
                  </ItemGrid>
                  <ItemGrid xs={12} sm={12} md={8}>
                    <h5>{info.email}</h5>
                  </ItemGrid>
                </GridContainer>
                <GridContainer>
                  <ItemGrid xs={12} sm={12} md={4}>
                    <h5>Trạng thái :</h5>
                  </ItemGrid>

                  <ItemGrid xs={12} sm={12} md={3}>
                    <h5>{info.status ? 'Đang hoạt động' : 'Đã khoá'}</h5>
                  </ItemGrid>
                  <ItemGrid xs={12} sm={12} md={5}></ItemGrid>
                </GridContainer>
                <Button
                  color="warning"
                  onClick={() => {
                    history.push('/manager/editprofile');
                  }}
                  right
                >
                  Quên mật khẩu (Chưa phát triển)
                </Button>
                <Clearfix />
              </div>
            }
          />
        </ItemGrid>
        <ItemGrid xs={12} sm={12} md={4}>
          <ProfileCard
            avatar={currentUser.picture}
            subtitle={info.group}
            title={info.fullname}
            description={info.description}
            content={
              <Link to="/">
                <Button color="rose" round>
                  Về trang chủ
                </Button>
              </Link>
            }
          />
        </ItemGrid>
      </GridContainer>
      {info.groupid === 3 && (
        <GridContainer>
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
                if (state.category === '' && state.subcategory === '') {
                  return (
                    <ItemGrid xs={12} sm={12} md={4}>
                      <ImagePriceCard
                        image={item.imagePath}
                        title={item.title}
                        text={item.description}
                        price={item.teachername}
                        statIcon={UpdateIcon}
                        statText={
                          item.publish ? `Đang hiển thị` : 'Bị đình chỉ'
                        }
                        hover
                        underImage={
                          <div>
                            <Tooltip
                              id="tooltip-top"
                              title="Xem"
                              placement="bottom"
                              classes={{ tooltip: classes.tooltip }}
                            >
                              <Button color="defaultNoBackground" justIcon>
                                <ArtTrack className={classes.underChartIcons} />
                              </Button>
                            </Tooltip>
                            <Tooltip
                              id="tooltip-top"
                              title="Sửa"
                              placement="bottom"
                              classes={{ tooltip: classes.tooltip }}
                            >
                              <Button color="successNoBackground" justIcon>
                                <EditIcon className={classes.underChartIcons} />
                              </Button>
                            </Tooltip>
                            {item.publish === true && (
                              <Tooltip
                                id="tooltip-top"
                                title="Đình chỉ"
                                placement="bottom"
                                classes={{ tooltip: classes.tooltip }}
                              >
                                <Button
                                  color="dangerNoBackground"
                                  onClick={() =>
                                    changePublish(item.courseid, !item.publish)
                                  }
                                  justIcon
                                >
                                  <VpnLockIcon
                                    className={classes.underChartIcons}
                                  />
                                </Button>
                              </Tooltip>
                            )}
                            {item.publish === false && (
                              <Tooltip
                                id="tooltip-top"
                                title="Trực tuyến"
                                placement="bottom"
                                classes={{ tooltip: classes.tooltip }}
                              >
                                <Button
                                  color="primaryNoBackground"
                                  onClick={() =>
                                    changePublish(item.courseid, !item.publish)
                                  }
                                  justIcon
                                >
                                  <PublicIcon
                                    className={classes.underChartIcons}
                                  />
                                </Button>
                              </Tooltip>
                            )}
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
                        price={item.teachername}
                        statIcon={UpdateIcon}
                        statText={
                          item.publish ? `Đang hiển thị` : 'Bị đình chỉ'
                        }
                        hover
                        underImage={
                          <div>
                            <Tooltip
                              id="tooltip-top"
                              title="Xem"
                              placement="bottom"
                              classes={{ tooltip: classes.tooltip }}
                            >
                              <Button color="defaultNoBackground" justIcon>
                                <ArtTrack className={classes.underChartIcons} />
                              </Button>
                            </Tooltip>
                            <Tooltip
                              id="tooltip-top"
                              title="Sửa"
                              placement="bottom"
                              classes={{ tooltip: classes.tooltip }}
                            >
                              <Button color="successNoBackground" justIcon>
                                <EditIcon className={classes.underChartIcons} />
                              </Button>
                            </Tooltip>
                            {item.publish === true && (
                              <Tooltip
                                id="tooltip-top"
                                title="Đình chỉ"
                                placement="bottom"
                                classes={{ tooltip: classes.tooltip }}
                              >
                                <Button
                                  color="dangerNoBackground"
                                  onClick={() =>
                                    changePublish(item.courseid, !item.publish)
                                  }
                                  justIcon
                                >
                                  <VpnLockIcon
                                    className={classes.underChartIcons}
                                  />
                                </Button>
                              </Tooltip>
                            )}
                            {item.publish === false && (
                              <Tooltip
                                id="tooltip-top"
                                title="Trực tuyến"
                                placement="bottom"
                                classes={{ tooltip: classes.tooltip }}
                              >
                                <Button
                                  color="primaryNoBackground"
                                  onClick={() =>
                                    changePublish(item.courseid, !item.publish)
                                  }
                                  justIcon
                                >
                                  <PublicIcon
                                    className={classes.underChartIcons}
                                  />
                                </Button>
                              </Tooltip>
                            )}
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
                        price={item.teachername}
                        statIcon={UpdateIcon}
                        statText={
                          item.publish ? `Đang hiển thị` : 'Bị đình chỉ'
                        }
                        hover
                        underImage={
                          <div>
                            <Tooltip
                              id="tooltip-top"
                              title="Xem"
                              placement="bottom"
                              classes={{ tooltip: classes.tooltip }}
                            >
                              <Button color="defaultNoBackground" justIcon>
                                <ArtTrack className={classes.underChartIcons} />
                              </Button>
                            </Tooltip>
                            <Tooltip
                              id="tooltip-top"
                              title="Sửa"
                              placement="bottom"
                              classes={{ tooltip: classes.tooltip }}
                            >
                              <Button color="successNoBackground" justIcon>
                                <EditIcon className={classes.underChartIcons} />
                              </Button>
                            </Tooltip>
                            {item.publish === true && (
                              <Tooltip
                                id="tooltip-top"
                                title="Đình chỉ"
                                placement="bottom"
                                classes={{ tooltip: classes.tooltip }}
                              >
                                <Button
                                  color="dangerNoBackground"
                                  onClick={() =>
                                    changePublish(item.courseid, !item.publish)
                                  }
                                  justIcon
                                >
                                  <VpnLockIcon
                                    className={classes.underChartIcons}
                                  />
                                </Button>
                              </Tooltip>
                            )}
                            {item.publish === false && (
                              <Tooltip
                                id="tooltip-top"
                                title="Trực tuyến"
                                placement="bottom"
                                classes={{ tooltip: classes.tooltip }}
                              >
                                <Button
                                  color="primaryNoBackground"
                                  onClick={() =>
                                    changePublish(item.courseid, !item.publish)
                                  }
                                  justIcon
                                >
                                  <PublicIcon
                                    className={classes.underChartIcons}
                                  />
                                </Button>
                              </Tooltip>
                            )}
                          </div>
                        }
                      />
                    </ItemGrid>
                  );
                }
                return <div></div>;
              })}
          </GridContainer>
        </GridContainer>
      )}
    </div>
  );
}

UserAndCourse.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(dashboardStyle)(UserAndCourse);
