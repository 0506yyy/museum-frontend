<template>
  <header class="header">
    <div class="header-container">
      <div class="header-left">
        <span>xx省文化和旅游厅</span>
        <span>xx省文物局</span>
      </div>
      <div class="header-logo">
        <div class="logo-text">华夏文明博物院</div>
      </div>
      <div class="header-right">
        <span>手机APP</span>
        <span>繁体中文</span>
        <span>English</span>
        <router-link to="/admin/login" class="admin-link">
          <i class="fas fa-user-shield"></i> 后台管理
        </router-link>
      </div>
    </div>
  </header>
</template>

<style scoped>
.admin-link {
  margin-left: 16px;
  color: #ffd700;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.15);
  transition: all 0.3s;
}

.admin-link:hover {
  background: rgba(255, 255, 255, 0.3);
  color: #fff;
}

.header {
  background: linear-gradient(135deg, #8b1e1e 0%, #5a1016 100%);
  color: #ecb0af;
  padding: 12px 0;
}

.header-container {
  width: 1200px;
  max-width: 90%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-left span,
.header-right span {
  margin: 0 8px;
  font-size: 14px;
  cursor: pointer;
  transition: opacity 0.3s;
}

.header-left span:hover,
.header-right span:hover {
  opacity: 0.8;
}

.header-logo .logo-text {
  font-size: 28px;
  font-weight: bold;
  color: #ffd700;
  letter-spacing: 2px;
}

@media (max-width: 768px) {

  .header-left span,
  .header-right span {
    font-size: 12px;
    margin: 0 4px;
  }

  .header-logo .logo-text {
    font-size: 20px;
  }
}
</style>
