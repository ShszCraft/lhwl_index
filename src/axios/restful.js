
const auth = {
  authorization: 'authorization/',
  authorizationRefresh: 'authorization-refresh/',
  authorizationVerify: 'authorization-verify/'
}

const root = {
  model: {
    public: {
      goods: 'model-public/goods/'
    },
    private: {
      user: 'model-private/user/'
    }
  },
  method: {
    public: {
      index: 'method-public/index/',
      sector: 'method-public/sector/',
      wheel: 'method-public/wheel/',
      searchingList: 'method-public/searching-list/'
    },
    private: {
      order: 'method-private/order/'
    }
  },
  search: {
    index: 'search/'
  }
}

/*
 * 获取Jwt Token令牌
 * @url /api/v2/authorization/
 * @param {Number} index 接口索引 */
export function authorization (index = null) {
  if (index) return auth.authorization + index + '/'
  return auth.authorization
}

/*
 * 刷新Jwt Token令牌
 * @url /api/v2/authorization-refresh/
 * @param {Number} index 接口索引 */
export function authorizationRefresh (index = null) {
  if (index) return auth.authorizationRefresh + index + '/'
  return auth.authorizationRefresh
}

/*
 * 验证Jwt Token令牌
 * @url /api/v2/authorization-verify/
 * @param {Number} index 接口索引 */
export function authorizationVerify (index = null) {
  if (index) return auth.authorizationVerify + index + '/'
  return auth.authorizationVerify
}

/*
 * 用户User接口
 * @url /api/v2/model-private/user/
 * @param {Number} index 接口索引 */
export function modelPrivateUser (index = null) {
  if (index) return root.model.private.user + index + '/'
  return root.model.private.user
}

/*
 * 订单Order接口， 查询订单信息接口
 * @url /api/v2/method-private/order/
 * @param {Number} index 接口索引 */
export function methodOrder (index = null) {
  if (index) return root.method.private.order + index + '/'
  return root.method.private.order
}

/*
 * 商品Goods接口， 获取商品实例信息
 * @url /api/v2/method-private/order/
 * @param {Number} index 接口索引 */
export function modelsGoods (index = null) {
  if (index) return root.model.public.goods + index + '/'
  return root.model.public.goods
}

/*
 * 商品子分类SearchingList接口， 获取子分类筛选及商品信息
 * @url /api/v2/method-public/searching-list/{ID}/
 * @param {Number} index 接口索引 */
export function modelsSearchingList (index = null) {
  if (index) return root.method.public.searchingList + index + '/'
  return root.method.public.searchingList
}

/*
 * 商品搜索Searching接口， 通过关键字搜索商品信息
 * @url /api/v2/search/?q=search
 * @param {Number} index 接口索引 */
export function modelsSearching (index = null) {
  if (index) return root.search.index + index + '/'
  return root.search.index
}

/*
 * 首页Index接口， 网站首页
 * @url /api/v2/method-public/index/
 * @param {Number} index 接口索引 */
export function methodIndex (index = null) {
  if (index) return root.method.public.index + index + '/'
  return root.method.public.index
}

/*
 * 首页Index接口， 网站轮播图
 * @url /api/v2/model-public/wheel/
 * @param {Number} index 接口索引 */
export function modelsIndexWheel (index = null) {
  if (index) return root.method.public.wheel + index + '/'
  return root.method.public.wheel
}

/*
 * 首页板块栏目接口，板块类别 展示商品
 * @url /api/v2/method-public/sector/
 * @param {Number} index 接口索引 */
export function modelsIndexSector (index = null) {
  if (index) return root.method.public.sector + index + '/'
  return root.method.public.sector
}
