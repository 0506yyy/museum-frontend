<template>
  <div class="home">
    <div class="hero">
      <h1>华夏文明博物院</h1>
      <p>传承中原文明，展示历史瑰宝</p>
    </div>
    <div class="features">
      <div class="feature-card">
        <i class="fas fa-history"></i>
        <h3>千年历史</h3>
        <p>中原文化发源地，华夏文明摇篮</p>
      </div>
      <div class="feature-card">
        <i class="fas fa-archway"></i>
        <h3>珍贵文物</h3>
        <p>17万余件藏品，见证历史变迁</p>
      </div>
      <div class="feature-card">
        <i class="fas fa-users"></i>
        <h3>专业讲解</h3>
        <p>免费讲解服务，深度解读文物</p>
      </div>
    </div>
    <div class="info-box">
      <i class="fas fa-info-circle"></i>
      <strong>开放时间：</strong> 9:00 - 17:00（16:00停止入馆），周一闭馆（法定节假日除外）
    </div>
  </div>
</template>

<style scoped>
.home {
  padding: 20px 0;
}

.hero {
  text-align: center;
  padding: 60px 0;
  background: linear-gradient(135deg, #f9f9f9 0%, #e8e8e8 100%);
  border-radius: 12px;
  margin-bottom: 40px;
}

.hero h1 {
  font-size: 48px;
  color: #741a1a;
  margin-bottom: 16px;
}

.hero p {
  font-size: 18px;
  color: #666;
}

.features {
  display: flex;
  gap: 30px;
  margin-bottom: 40px;
  flex-wrap: wrap;
}

.feature-card {
  flex: 1;
  text-align: center;
  padding: 30px 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
}

.feature-card i {
  font-size: 48px;
  color: #741a1a;
  margin-bottom: 16px;
}

.feature-card h3 {
  margin-bottom: 12px;
  color: #333;
}

.feature-card p {
  color: #666;
  font-size: 14px;
}

.info-box {
  background: #fff3e0;
  padding: 16px 20px;
  border-radius: 8px;
  border-left: 4px solid #741a1a;
  color: #666;
}

.info-box i {
  color: #741a1a;
  margin-right: 8px;
}

@media (max-width: 768px) {
  .hero h1 {
    font-size: 32px;
  }

  .features {
    flex-direction: column;
  }
}
</style>
