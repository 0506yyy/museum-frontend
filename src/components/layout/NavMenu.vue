<template>
  <nav class="nav-menu">
    <div class="nav-container">
      <ul class="nav-list">
        <li><router-link to="/">首页</router-link></li>
        <li><a href="#">本院概览</a></li>
        <li><router-link to="/news">文博资讯</router-link></li>
        <li><a href="#">陈列展览</a></li>
        <li><a href="#">典藏精品</a></li>
        <li><a href="#">学术研究</a></li>
        <li class="has-submenu">
          <a href="#">公众服务</a>
          <ul class="submenu">
            <li><router-link to="/reservation">预约参观</router-link></li>
            <li><a href="#">服务设施</a></li>
            <li><a href="#">参观导览</a></li>
            <li><a href="#">交通路线</a></li>
          </ul>
        </li>
        <li><a href="#">品牌教育</a></li>
        <li><a href="#">文物保护</a></li>
        <li><a href="#">文化创意</a></li>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
// 导航菜单组件
</script>

<style scoped>
.nav-menu {
  background-color: #741a1a;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-container {
  width: 1200px;
  max-width: 90%;
  margin: 0 auto;
}

.nav-list {
  display: flex;
  list-style: none;
  height: 45px;
  margin: 0;
  padding: 0;
}

.nav-list>li {
  position: relative;
  height: 100%;
}

.nav-list>li>a {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 28px;
  color: white;
  text-decoration: none;
  font-size: 16px;
  transition: all 0.3s;
}

.nav-list>li>a:hover,
.nav-list>li>a.router-link-active {
  background-color: #9e2a2a;
  padding-top: 12px;
}

.has-submenu .submenu {
  display: none;
  position: absolute;
  top: 45px;
  left: 0;
  background-color: #741a1a;
  list-style: none;
  padding: 0;
  margin: 0;
  min-width: 120px;
  z-index: 100;
  border-radius: 0 0 4px 4px;
  overflow: hidden;
}

.has-submenu:hover .submenu {
  display: block;
}

.submenu li a {
  display: block;
  padding: 12px 16px;
  color: white;
  text-decoration: none;
  font-size: 14px;
  text-align: center;
  transition: background-color 0.3s;
}

.submenu li a:hover {
  background-color: #5a1016;
}

@media (max-width: 1024px) {
  .nav-list>li>a {
    padding: 0 16px;
    font-size: 14px;
  }
}
</style>
