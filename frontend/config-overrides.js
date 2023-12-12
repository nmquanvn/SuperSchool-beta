const { override, addBabelPlugins, addWebpackAlias } = require('customize-cra');
const path = require('path');

module.exports = override(
  addBabelPlugins('@babel/plugin-syntax-optional-chaining'),
  addWebpackAlias({
    ['@features']: path.resolve(__dirname, 'src/features'),
    ['@hooks']: path.resolve(__dirname, 'src/hooks'),
    ['@utils']: path.resolve(__dirname, 'src/utils'),
    ['@api']: path.resolve(__dirname, 'src/api'),
    ['@components']: path.resolve(__dirname, 'src/components'),
    ['@constants']: path.resolve(__dirname, 'src/constants'),
    ['@custom-fields']: path.resolve(__dirname, 'src/custom-fields'),
    ['@app']: path.resolve(__dirname, 'src/app'),

    //CMS
    ['@cmsassets']: path.resolve(__dirname, 'src/features/cms/assets'),
    ['@cmscomponents']: path.resolve(__dirname, 'src/features/cms/components'),
    ['@cmsvariables']: path.resolve(__dirname, 'src/features/cms/variables'),
    ['@cmsviews']: path.resolve(__dirname, 'src/features/cms/views'),
    ['@cmsroutes']: path.resolve(__dirname, 'src/features/cms/routes'),
  })
);
