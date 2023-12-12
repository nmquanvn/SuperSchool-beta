/* eslint-disable */

import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
// material-ui components
import withStyles from 'material-ui/styles/withStyles';
import FormLabel from 'material-ui/Form/FormLabel';
import FormControlLabel from 'material-ui/Form/FormControlLabel';
import Radio from 'material-ui/Radio';
// material-ui-icons
import FiberManualRecord from 'material-ui-icons/FiberManualRecord';
import Check from 'material-ui-icons/Check';
//React quill
import Editor from '@cmscomponents/Editor/Editor.jsx'; // ES6

//Money
import CurrencyTextField from '@unicef/material-ui-currency-textfield';

//APIS
import categoryApi from '@api/categoryApi';

// core components
import { Upload } from 'antd';
import { uploadService } from '@utils/uploadService';
import NavPills from '@cmscomponents/NavPills/NavPills.jsx';
import GridContainer from '@cmscomponents/Grid/GridContainer.jsx';
import ItemGrid from '@cmscomponents/Grid/ItemGrid.jsx';
import HeaderCard from '@cmscomponents/Cards/HeaderCard.jsx';
import CustomInput from '@cmscomponents/CustomInput/CustomInput.jsx';
import Accordion from '@cmscomponents/Accordion/Accordion.jsx';
import Select from 'material-ui/Select';
import MenuItem from 'material-ui/Menu/MenuItem';
import FormControl from 'material-ui/Form/FormControl';
import InputLabel from 'material-ui/Input/InputLabel';
import regularFormsStyle from '@cmsassets/jss/material-dashboard-pro-react/views/regularFormsStyle';
import Button from '@cmscomponents/CustomButtons/Button.jsx';
import Checkbox from 'material-ui/Checkbox';
import SweetAlert from 'react-bootstrap-sweetalert';
import coursesApi from '@api/coursesApi';
import { useSelector } from 'react-redux';
function AddCourse(props) {
  const currentUser = useSelector(({ userReducer }) => userReducer?.user);
  console.log(currentUser.userId);
  let history = useHistory();
  const [state, setState] = useState({
    alert: null,
    show: false,
    checked: [24, 22],
    selectedValue: null,
    selectedEnabled: 'b',
    createCourse: false,
    editCourse: false,
    category: '',
    subcategory: '',
    listcategory: [],
    listsubcategory: [],
    link: '',
  });
  const htmlAlert = (value, message) => {
    setState({
      ...state,
      alert: (
        <SweetAlert
          style={{ display: 'block', marginTop: '-100px' }}
          title={value}
          onConfirm={() => hideAlert()}
          onCancel={() => hideAlert()}
          confirmBtnCssClass={
            props.classes.button + ' ' + props.classes.success
          }
        >
          <b>{value}</b> {message}{' '}
        </SweetAlert>
      ),
    });
  };
  const moveToCourses = () => {
    history.push('/manager/teachercourses');
  };
  const successAlert = () => {
    setState({
      ...state,
      alert: (
        <SweetAlert
          success
          style={{ display: 'block', marginTop: '-100px' }}
          title="Đăng ký hoàn tất!"
          onConfirm={moveToCourses}
          onCancel={() => hideAlert()}
          confirmBtnCssClass={
            props.classes.button + ' ' + props.classes.success
          }
        >
          Chúc mừng bạn đã đăng ký khoá học thành công!
        </SweetAlert>
      ),
    });
  };
  const hideAlert = () => {
    setState({ ...state, alert: null });
  };
  //////////////////////////////////Validation by state/////////////////////////
  const verifyUrl = (value) => {
    try {
      new URL(value);
      return true;
    } catch (_) {
      return false;
    }
  };

  const [course, setCourse] = useState({
    title: '',
    imagePath: '',
    description: '',
    detailDescription: '',
    price: 0,
    status: '',
    categoryId: '',
    teacherId: currentUser?.userId ? +currentUser.userId : '',
    numberOfChapters: 5,
  });
  const [coursevid, setCoursevid] = useState({
    couseid: false,
    chapters: [],
  });

  let moneyisValid = course.price < 1;
  useEffect(() => {
    let chapters = [];
    for (let i = 0; i < course.numberOfChapters; i++) {
      let chapter = {
        orderNo: i + 1,
        title: coursevid?.chapters[i]?.title ? coursevid.chapters[i].title : '',
        filePath: coursevid?.chapters[i]?.filePath
          ? coursevid.chapters[i].filePath
          : '',
        preview: coursevid?.chapters[i]?.preview
          ? coursevid.chapters[i].preview
          : false,
      };
      chapters.push(chapter);
    }
    setCoursevid({ ...coursevid, chapters: chapters });
  }, [course.numberOfChapters]);
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
        setState({
          ...state,
          listcategory: fetch_maincat.data,
          listsubcategory: state.subcategory !== '' ? fetch_subcat.data : [],
        });
      } catch (err) {}
    }, 200);
  }, []);
  const uploadImage = async (options) => {
    const { file, onSuccess, onError } = options;
    const link = await uploadService('image', file);
    if (link) {
      onSuccess(file);
      setState({ ...state, link: link });
    } else {
      onError(file);
    }
  };
  const uploadVideo = async (options) => {
    const { file, onSuccess, onError } = options;
    const link = await uploadService('video', file);
    if (link) {
      onSuccess(file);
      setState({ ...state, link: link });
    } else {
      onError(file);
    }
  };
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
    setCourse({ ...course, categoryId: +event.target.value });
  };

  const statusChange = function (event) {
    setState({ ...state, selectedValue: event.target.value });
    setCourse({
      ...course,
      status: event.target.value === 'a' ? 'COMPLETE' : 'INCOMPLETE',
    });
  };
  const isValidated = async () => {
    let {
      title,
      imagePath,
      description,
      detailDescription,
      price,
      status,
      categoryId,
      teacherId,
      numberOfChapters,
    } = course;
    if (title.length <= 30) {
      htmlAlert('Tên khoá học', 'phải nhiều hơn 20 ký tự');
      return;
    }
    if (!verifyUrl(imagePath)) {
      htmlAlert('Hình ảnh khoá học', 'phải là đường dẫn');
      return;
    }
    if (categoryId === '') {
      htmlAlert('Danh mục', 'phải được chọn');
      return;
    }
    if (categoryId === 'c') {
      htmlAlert('Danh mục', 'phải được chọn');
      return;
    }
    if (detailDescription.length <= 100) {
      htmlAlert('Mô tả chi tiết', 'phải nhiều hơn 100 ký tự');
      return;
    }
    if (moneyisValid) {
      htmlAlert('Giá tiền', 'thấp nhất là 1000');
      return;
    }
    if (numberOfChapters < 1 || numberOfChapters > 12) {
      htmlAlert('Chương khoá học', 'chỉ được phép từ 1 tới tối đa 11 chương');
      return;
    }
    if (status === '') {
      htmlAlert('Trạng thái', 'phải được chọn');
      return;
    }
    if (teacherId === '') {
      htmlAlert('Không tìm thấy Giảng viên', 'Missing Teacher');
      return;
    }
    if (status === 'COMPLETE') {
      let previewcount = 0;
      let video = coursevid.chapters;
      for (let i = 0; i < video.length; i++) {
        if (video[i].title === '') {
          htmlAlert(
            `Chương số ${video[i].orderNo}`,
            'Vui lòng nhập tên chương'
          );
          return;
        } else if (video[i].filePath === '') {
          htmlAlert(
            `Chương số ${video[i].orderNo}`,
            'Vui lòng nhập đường dẫn Video'
          );
          return;
        }
        if (video[i].preview) {
          previewcount++;
        }
      }
      if (status === 'INCOMPLETE') {
        let video = coursevid.chapters;
        let count = 0;
        for (let i = 0; i < video.length; i++) {
          if (video[i].title === '' || video[i].filePath === '') {
            count++;
          }
        }
        if (count === 0) {
          htmlAlert(
            'Sai thông tin trạng thái',
            'Bạn đã nhập toàn bộ chương, vui lòng chọn trạng thái khoá học là "Hoàn thành"'
          );
          return;
        }
      }
    }
    ////Handle Create Course
    try {
      let data = course;
      data.videos = coursevid.chapters;
      delete data.numberOfChapters;
      const result = await coursesApi.teacherCreateCourse(data);
      if (result) {
        successAlert();
      }
    } catch (err) {
      console.log(err);
    }
  };
  const loadChapters = function () {
    let chaparr = [];
    let i = 0;
    coursevid.chapters.forEach((item) => {
      chaparr.push({
        title: `Chương #${item.orderNo}`,
        content: (
          <ItemGrid xs={12} sm={12} md={12}>
            <GridContainer>
              <ItemGrid xs={12} sm={2}>
                <FormLabel className={classes.labelHorizontal}>
                  Tên chương
                </FormLabel>
              </ItemGrid>
              <ItemGrid xs={12} sm={10}>
                <CustomInput
                  id="help-text"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    type: 'text',
                    onChange: (e) => handleTitleChange(e, item.orderNo),
                    defaultValue: item.title,
                  }}
                />
              </ItemGrid>
            </GridContainer>
            <GridContainer>
              <ItemGrid xs={12} sm={2}>
                <FormLabel className={classes.labelHorizontal}>
                  Đường dẫn video
                </FormLabel>
              </ItemGrid>
              <ItemGrid xs={12} sm={10}>
                <CustomInput
                  id="help-text"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    type: 'text',
                    onChange: (e) => handleVideoChange(e, item.orderNo),
                    defaultValue: item.filePath,
                  }}
                />
              </ItemGrid>
            </GridContainer>
            <GridContainer>
              <ItemGrid xs={12} sm={2}></ItemGrid>
              <ItemGrid xs={12} sm={10}>
                <FormControlLabel
                  control={
                    <Checkbox
                      tabIndex={-1}
                      checked={item.preview}
                      onClick={() => handleToggle(item.orderNo, !item.preview)}
                      checkedIcon={<Check className={classes.checkedIcon} />}
                      icon={<Check className={classes.uncheckedIcon} />}
                      classes={{
                        checked: classes.checked,
                      }}
                    />
                  }
                  classes={{
                    label: classes.label,
                  }}
                  label="Cho phép Preview"
                />
              </ItemGrid>
            </GridContainer>
          </ItemGrid>
        ),
      });
    });
    return chaparr;
  };

  const handleToggle = function (order, value) {
    let data = coursevid.chapters;
    let foundIndex = data.findIndex((x) => x.orderNo === order);
    data[foundIndex].preview = value;
    setCoursevid({ ...coursevid, chapters: data });
  };
  const handleTitleChange = (e, order) => {
    let data = coursevid.chapters;
    let foundIndex = data.findIndex((x) => x.orderNo === order);
    data[foundIndex].title = e.target.value;
    setCoursevid({ ...coursevid, chapters: data });
  };
  const handleVideoChange = (e, order) => {
    let data = coursevid.chapters;
    let foundIndex = data.findIndex((x) => x.orderNo === order);
    data[foundIndex].filePath = e.target.value;
    setCoursevid({ ...coursevid, chapters: data });
  };
  const { classes } = props;
  return (
    <GridContainer>
      {state.alert}
      {console.log(course)}
      <ItemGrid xs={12} sm={12} md={12}>
        <HeaderCard
          cardTitle="Thông tin khoá học"
          headerColor="rose"
          content={
            <NavPills
              color="rose"
              tabs={[
                {
                  tabButton: 'Thông tin chung',
                  tabContent: (
                    <form>
                      <GridContainer>
                        <ItemGrid xs={12} sm={2}>
                          <FormLabel className={classes.labelHorizontal}>
                            Hình ảnh
                          </FormLabel>
                        </ItemGrid>
                        <ItemGrid xs={12} sm={10}>
                          <CustomInput
                            id="help-text"
                            formControlProps={{
                              fullWidth: true,
                            }}
                            inputProps={{
                              type: 'text',
                              onChange: (e) => {
                                setCourse({
                                  ...course,
                                  imagePath: e.target.value,
                                });
                              },
                            }}
                            helpText="Upload hình ảnh bên dưới và đặt đường dẫn ở đây"
                          />
                        </ItemGrid>
                      </GridContainer>
                      <GridContainer>
                        <ItemGrid xs={12} sm={2}>
                          <FormLabel className={classes.labelHorizontal}>
                            Tên khoá học
                          </FormLabel>
                        </ItemGrid>
                        <ItemGrid xs={12} sm={10}>
                          <CustomInput
                            id="help-text"
                            formControlProps={{
                              fullWidth: true,
                            }}
                            inputProps={{
                              type: 'text',
                              name: 'title',
                              onChange: (e) => {
                                setCourse({ ...course, title: e.target.value });
                              },
                            }}
                            helpText="Tên khoá học sẽ được hiển thị kèm hình ảnh và mô tả ở đầu khoá học"
                          />
                        </ItemGrid>
                      </GridContainer>
                      <GridContainer>
                        <ItemGrid xs={12} sm={2}>
                          <FormLabel className={classes.labelHorizontal}>
                            Danh mục
                          </FormLabel>
                        </ItemGrid>
                        <ItemGrid xs={12} sm={5}>
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
                        <ItemGrid xs={12} sm={5}>
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
                      </GridContainer>
                      <GridContainer>
                        <ItemGrid xs={12} sm={2}>
                          <FormLabel className={classes.labelHorizontal}>
                            Mô tả khoá học
                          </FormLabel>
                        </ItemGrid>
                        <ItemGrid xs={12} sm={10}>
                          <CustomInput
                            id="description"
                            formControlProps={{
                              fullWidth: true,
                            }}
                            inputProps={{
                              placeholder: 'Mô tả bằng 10-20 từ',
                              onChange: (e) => {
                                setCourse({
                                  ...course,
                                  description: e.target.value,
                                });
                              },
                            }}
                            helpText="Mô tả sơ lược về khoá học."
                          />
                        </ItemGrid>
                      </GridContainer>
                      <br />
                      <GridContainer>
                        <ItemGrid xs={12} sm={2}>
                          <FormLabel className={classes.labelHorizontal}>
                            Thông tin chi tiết
                          </FormLabel>
                        </ItemGrid>
                        <ItemGrid xs={12} sm={10}>
                          <Editor
                            id="detailDescription"
                            placeholder={'Mô tả chi tiết khoá học của bạn...'}
                            value={course.detailDescription}
                            onChange={(value) =>
                              setCourse({
                                ...course,
                                detailDescription: value,
                              })
                            }
                          />
                        </ItemGrid>
                      </GridContainer>
                      <GridContainer>
                        <br />
                      </GridContainer>
                      <GridContainer>
                        <ItemGrid xs={12} sm={2}>
                          <FormLabel className={classes.labelHorizontal}>
                            Giá tiền
                          </FormLabel>
                        </ItemGrid>
                        <ItemGrid xs={12} sm={10}>
                          <CurrencyTextField
                            label="Nhập số tiền"
                            value="0"
                            currencySymbol="VND"
                            decimalCharacter="."
                            digitGroupSeparator=","
                            error={moneyisValid}
                            outputFormat="number"
                            onChange={(e, value) =>
                              setCourse({ ...course, price: value })
                            }
                            helperText={
                              moneyisValid &&
                              'Giá tiền thấp nhất của khoá học là 1VND'
                            }
                          />
                        </ItemGrid>
                      </GridContainer>
                      <GridContainer>
                        <ItemGrid xs={12} sm={2}>
                          <FormLabel className={classes.labelHorizontal}>
                            Số chương của khoá học
                          </FormLabel>
                        </ItemGrid>
                        <ItemGrid xs={12} sm={10}>
                          <CustomInput
                            id="help-text"
                            formControlProps={{
                              fullWidth: true,
                            }}
                            inputProps={{
                              type: 'number',
                              defaultValue: course.numberOfChapters,
                              onChange: (e) =>
                                setCourse({
                                  ...course,
                                  numberOfChapters: e.target.value,
                                }),
                            }}
                            helpText=""
                          />
                        </ItemGrid>
                      </GridContainer>
                      <GridContainer>
                        <ItemGrid xs={12} sm={2}>
                          <FormLabel
                            className={
                              classes.labelHorizontal +
                              ' ' +
                              classes.labelHorizontalRadioCheckbox
                            }
                          >
                            Trạng thái khoá học
                          </FormLabel>
                        </ItemGrid>
                        <ItemGrid xs={12} sm={10}>
                          <div className={classes.inlineChecks}>
                            <div className={classes.checkboxAndRadioHorizontal}>
                              <FormControlLabel
                                control={
                                  <Radio
                                    tabIndex={-1}
                                    checked={state.selectedValue === 'a'}
                                    onChange={statusChange}
                                    value="a"
                                    name="radio button demo"
                                    aria-label="A"
                                    icon={
                                      <FiberManualRecord
                                        className={classes.radioUnchecked}
                                      />
                                    }
                                    checkedIcon={
                                      <FiberManualRecord
                                        className={classes.radioChecked}
                                      />
                                    }
                                    classes={{
                                      checked: classes.radio,
                                    }}
                                  />
                                }
                                classes={{
                                  label: classes.label,
                                }}
                                label="Hoàn thành"
                              />
                              <FormControlLabel
                                control={
                                  <Radio
                                    tabIndex={-1}
                                    checked={state.selectedValue === 'b'}
                                    onChange={statusChange}
                                    value="b"
                                    name="radio button demo"
                                    aria-label="B"
                                    icon={
                                      <FiberManualRecord
                                        className={classes.radioUnchecked}
                                      />
                                    }
                                    checkedIcon={
                                      <FiberManualRecord
                                        className={classes.radioChecked}
                                      />
                                    }
                                    classes={{
                                      checked: classes.radio,
                                    }}
                                  />
                                }
                                classes={{
                                  label: classes.label,
                                }}
                                label="Chưa hoàn thành"
                              />
                            </div>
                          </div>
                        </ItemGrid>
                      </GridContainer>
                    </form>
                  ),
                },
                {
                  tabButton: 'Chương khoá học',
                  tabContent: (
                    <form>
                      <Accordion
                        active={0}
                        collapses={
                          loadChapters()
                          // coursevid.chapters.map((item, index) => ({
                          //   title: `Chương #1`,
                          //   content: 'rarsfsdfsdf',
                          // })),
                          // {
                          //   title: 'Collapsible group Item #1',
                          //   content:
                          //     'Anim pariatur cliche reprehenderit, enim eiusmod hi',
                          // },
                        }
                      />
                    </form>
                  ),
                },
                {
                  tabButton: 'Xác nhận',
                  tabContent: (
                    <div>
                      <ItemGrid xs={12} sm={12} md={4}>
                        <Button color="rose" onClick={isValidated} center>
                          Đăng ký khoá học
                        </Button>
                      </ItemGrid>
                    </div>
                  ),
                },
              ]}
            />
          }
        />
      </ItemGrid>
      <ItemGrid xs={12} sm={12} md={12}>
        <HeaderCard
          cardTitle="Upload File"
          headerColor="rose"
          content={
            <form>
              <GridContainer>
                <ItemGrid xs={12} sm={2}>
                  <FormLabel className={classes.labelHorizontal}>
                    Đường dẫn
                  </FormLabel>
                </ItemGrid>
                <ItemGrid xs={12} sm={10}>
                  <CustomInput
                    id="help-text"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: 'text',
                      value: state.link,
                    }}
                    helpText="Đường dẫn sẽ hiển thị khi bạn upload file thành công."
                  />
                </ItemGrid>
              </GridContainer>
              <GridContainer>
                <ItemGrid xs={12} sm={2}></ItemGrid>
                <ItemGrid xs={12} sm={3}>
                  <Upload
                    accept="image/*"
                    customRequest={uploadImage}
                    maxCount={1}
                  >
                    <Button color="rose">Upload hình ảnh</Button>
                  </Upload>
                </ItemGrid>
                <ItemGrid xs={12} sm={4}>
                  <Upload
                    accept="image/*"
                    customRequest={uploadVideo}
                    maxCount={1}
                  >
                    <Button color="rose">Upload Video khoá học</Button>
                  </Upload>
                </ItemGrid>
              </GridContainer>
            </form>
          }
        />
      </ItemGrid>
    </GridContainer>
  );
}

export default withStyles(regularFormsStyle)(AddCourse);
