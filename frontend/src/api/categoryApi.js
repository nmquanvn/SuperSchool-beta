import axiosClient from './axiosClient';

const categoryApi = {
  getMain: async () => {
    const url = '/category/getByParentId';
    return await axiosClient.get(url);
  },
  getTree: async () => {
    const url = '/category/getTree';
    return await axiosClient.get(url);
  },
  getSubCategoryByParentId: async (id) => {
    const url = `/category/getByParentId?parentId=${id}`;
    return await axiosClient.get(url);
  },
  createCategory: async (object) => {
    console.log(object);
    const url = `/category/create`;
    return await axiosClient.post(url, object);
  },
  updateCategory: async (object) => {
    console.log(object);
    const url = '/category/update';
    return await axiosClient.put(url, object);
  },
  deleteCategory: async (id) => {
    const url = `/category/delete/${id}`;
    return await axiosClient.delete(url);
  },
  mainCategoryTableFill: async () => {
    const data = await categoryApi.getMain();

    return {
      title: 'Bảng danh mục chính',
      headerRow: [
        'ID',
        'Mã danh mục',
        'Tên danh mục',
        'Tên tiếng anh',
        'Thao tác',
      ],
      footerRow: [
        'ID',
        'Mã danh mục',
        'Tên danh mục',
        'Tên tiếng anh',
        'Thao tác',
      ],
      dataRows: data.data.map((prop) => [
        prop.categoryid,
        prop.code,
        prop.name,
        prop.english,
      ]),
    };
  },
  subCategoryTableFill: async () => {
    const data = await categoryApi.getTree();
    let list = [];
    data.data.forEach((item) => {
      let obj = {
        title: item.name,
        headerRow: [
          'ID',
          'Mã danh mục',
          'Tên danh mục',
          'Tên tiếng anh',
          'Danh mục cha',
          'Thao tác',
        ],
        footerRow: [
          'ID',
          'Mã danh mục',
          'Tên danh mục',
          'Tên tiếng anh',
          'Danh mục cha',
          'Thao tác',
        ],
        dataRows: item.children.map((prop) => [
          prop.categoryid,
          prop.code,
          prop.name,
          prop.english,
          prop.parentid,
        ]),
      };
      list.push(obj);
    });
    console.log(list[0]);
    return list;
  },
  // get list category
  getListCategory: async () => {
    const url = '/category';
    return await axiosClient.get(url);
  },
  //get top register category
  getTopRegisterCategory: async () => {
    const url = 'category/register/top';
    return await axiosClient.get(url);
  },
};

export default categoryApi;
