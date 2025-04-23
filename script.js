// 当文档加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化功能
    animateRatingBars();
    addCardHoverEffects();
    initializeTooltips();
    setResponsiveHeight();
    initializeRatingEffects();
    animateTagElements();
    
    // 移除价格相关功能初始化
    // initializeBinancePrice();
    // initializeShutdownPriceUpdates();
    
    // 移除刮奖效果相关代码
    
    // 窗口大小改变时调整高度
    window.addEventListener('resize', function() {
        setResponsiveHeight();
    });

    // 获取所有社交媒体图标和教程链接
    const socialIcons = document.querySelectorAll('.social-icon');
    const tutorialLinks = document.querySelectorAll('.hidden.md\\:flex a');
    const allClickableElements = [...socialIcons, ...tutorialLinks];
    
    // 获取消息提示元素
    const followMessage = document.getElementById('followMessage');
    
    // 掉落PEPE效果脚本
});

// 为标签元素添加动画效果
function animateTagElements() {
    const tagElements = document.querySelectorAll('.tag-animate');
    
    // 设置初始状态
    tagElements.forEach((tag, index) => {
        // 给每个标签一个随机的初始透明度，使其看起来更自然
        tag.style.opacity = '0';
        tag.style.transform = 'translateY(15px)';
        
        // 延迟显示，形成波浪进入的效果
        setTimeout(() => {
            tag.style.opacity = '1';
            tag.style.transform = 'translateY(0)';
            
            // 添加点击效果
            tag.addEventListener('click', function() {
                // 创建波纹效果
                const ripple = document.createElement('span');
                ripple.className = 'tag-ripple';
                ripple.style.position = 'absolute';
                ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
                ripple.style.borderRadius = '50%';
                ripple.style.pointerEvents = 'none';
                ripple.style.width = '100px';
                ripple.style.height = '100px';
                ripple.style.transform = 'translate(-50%, -50%) scale(0)';
                ripple.style.animation = 'tagRipple 0.6s linear';
                
                // 获取点击位置
                const rect = this.getBoundingClientRect();
                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;
                
                ripple.style.left = `${x}px`;
                ripple.style.top = `${y}px`;
                
                // 确保标签是相对定位以便放置波纹
                if (this.style.position !== 'relative') {
                    this.style.position = 'relative';
                }
                this.style.overflow = 'hidden';
                
                this.appendChild(ripple);
                
                // 动画结束后移除波纹元素
                setTimeout(() => {
                    ripple.remove();
                }, 600);
                
                // 添加缩放效果
                this.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 300);
            });
        }, 100 * (index + 1));
    });
    
    // 添加波纹动画样式
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes tagRipple {
            to {
                transform: translate(-50%, -50%) scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// 动画评级条
function animateRatingBars() {
    // 获取所有评级条
    const ratingBars = document.querySelectorAll('.rating-bar');
    
    // 为每个评级条添加发光元素
    ratingBars.forEach(bar => {
        const glow = document.createElement('div');
        glow.className = 'rating-glow';
        bar.appendChild(glow);
        
        // 设置初始位置在左侧
        glow.style.left = '0px';
        
        // 添加动画，使发光效果从左到右移动
        animateGlow(glow, bar);
    });
}

// 发光效果动画
function animateGlow(glow, bar) {
    // 计算评级条宽度
    const barWidth = bar.offsetWidth;
    
    // 设置动画持续时间与评级条宽度成正比
    const duration = barWidth * 20; // 假设每像素20ms
    
    // 使用requestAnimationFrame添加动画
    let start = null;
    
    function step(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        
        // 计算当前位置
        const position = (progress / duration) * barWidth;
        
        // 如果动画未完成，继续移动
        if (position <= barWidth) {
            glow.style.left = position + 'px';
            requestAnimationFrame(step);
        } else {
            // 动画完成后，重置位置并再次开始
            glow.style.left = '0px';
            start = null;
            setTimeout(() => requestAnimationFrame(step), 1000); // 延迟1秒再次开始
        }
    }
    
    // 开始动画
    requestAnimationFrame(step);
}

// 添加卡片悬停效果
function addCardHoverEffects() {
    const cards = document.querySelectorAll('.crypto-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
            this.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)';
        });
    });
}

// 初始化工具提示
function initializeTooltips() {
    const tooltipTargets = document.querySelectorAll('[data-tooltip]');
    
    tooltipTargets.forEach(element => {
        // 悬停时显示提示
        element.addEventListener('mouseenter', function() {
            // 获取提示文本
            const tooltipText = this.getAttribute('data-tooltip');
            
            // 创建提示元素
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = tooltipText;
            
            // 设置样式
            tooltip.style.position = 'absolute';
            tooltip.style.background = '#1e293b';
            tooltip.style.color = 'white';
            tooltip.style.padding = '4px 8px';
            tooltip.style.borderRadius = '4px';
            tooltip.style.fontSize = '0.7rem';
            tooltip.style.whiteSpace = 'nowrap';
            tooltip.style.zIndex = '1000';
            tooltip.style.opacity = '0';
            tooltip.style.transition = 'opacity 0.3s';
            
            // 添加到页面
            document.body.appendChild(tooltip);
            
            // 计算位置
            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 8 + 'px';
            
            // 显示提示
            setTimeout(() => tooltip.style.opacity = '1', 10);
            
            // 存储提示元素引用
            this._tooltip = tooltip;
        });
        
        // 鼠标离开时移除提示
        element.addEventListener('mouseleave', function() {
            if (this._tooltip) {
                const tooltip = this._tooltip;
                tooltip.style.opacity = '0';
                setTimeout(() => tooltip.remove(), 300);
                this._tooltip = null;
            }
        });
    });
}

// 设置响应式高度
function setResponsiveHeight() {
    // 获取视窗高度
    const vh = window.innerHeight;
    
    // 对某些需要填充高度的元素设置高度
    // 例如：让主内容区域至少占据视窗高度的80%
    const main = document.querySelector('main');
    if (main) {
        main.style.minHeight = `${vh * 0.8}px`;
    }
}

// 平滑滚动到锚点
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

// 为标签添加交互效果
const categoryTags = document.querySelectorAll('.rounded-full');
categoryTags.forEach(tag => {
    tag.addEventListener('click', () => {
        // 可以在这里添加标签点击的功能，例如筛选等
        tag.classList.add('ring-2', 'ring-offset-1');
        setTimeout(() => {
            tag.classList.remove('ring-2', 'ring-offset-1');
        }, 300);
    });
});

// 设置评级效果
function initializeRatingEffects() {
    // 为评级项添加悬停效果
    const ratingItems = document.querySelectorAll('.rating-item');
    
    ratingItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
            this.style.color = '#4F46E5'; // 悬停时变为靛蓝色
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
            this.style.color = ''; // 恢复原色
        });
    });
}

// 掉落PEPE效果脚本
document.addEventListener('DOMContentLoaded', function() {
    // 获取所有社交媒体图标和教程链接
    const socialIcons = document.querySelectorAll('.social-icon');
    const tutorialLinks = document.querySelectorAll('.hidden.md\\:flex a');
    const allClickableElements = [...socialIcons, ...tutorialLinks];
    
    // 获取消息提示元素
    const followMessage = document.getElementById('followMessage');
    
    // PEPE SVG内容
    const pepeSvg = `
        <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="pepegradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#0033AD" />
                    <stop offset="100%" stop-color="#3399FF" />
                </linearGradient>
            </defs>
            <circle cx="32" cy="32" r="32" fill="url(#pepegradient)"/>
            <path d="M32,16 C37.8,16 42.7,20.9 42.7,26.7 C42.7,31.7 39.2,36 34.4,37.1 C34.7,37.3 34.9,37.6 35.2,37.9 C36.5,39.2 39.2,39.2 40.5,37.9 C41.3,37.1 42.7,37.1 43.5,37.9 C44.3,38.7 44.3,40 43.5,40.8 C40.8,43.7 35.5,43.7 32.6,40.8 C32.3,40.5 32,40.3 31.7,40 C31.5,40.3 31.2,40.5 30.9,40.8 C28,43.7 22.9,43.7 20,40.8 C19.2,40 19.2,38.7 20,37.9 C20.8,37.1 22.1,37.1 22.9,37.9 C24.3,39.2 26.9,39.2 28.3,37.9 C28.5,37.6 28.8,37.3 29.1,37.1 C24.3,36 20.8,31.7 20.8,26.7 C20.8,20.9 25.7,16 31.5,16 L32,16 Z M32,20 C27.6,20 24,23.6 24,28 C24,32.4 27.6,36 32,36 C36.4,36 40,32.4 40,28 C40,23.6 36.4,20 32,20 Z" fill="white"/>
        </svg>
    `;
    
    // 创建掉落的PEPE
    function createFallingPepe(event, clickedElement) {
        const pepe = document.createElement('div');
        pepe.className = 'falling-crypto';
        pepe.innerHTML = pepeSvg;
        
        // 获取点击元素的位置
        const rect = clickedElement.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // 将PEPE放置在点击的图标位置
        pepe.style.left = (centerX - 20) + 'px'; // 20是PEPE宽度的一半
        pepe.style.top = centerY + 'px';
        
        // 随机水平位置偏移，让硬币分散一些 - 爆炸效果
        const offsetX = (Math.random() - 0.5) * 60; // 增大偏移范围
        pepe.style.left = `calc(${pepe.style.left} + ${offsetX}px)`;
        
        // 随机垂直位置偏移，增强爆炸感
        const offsetY = (Math.random() - 0.7) * 40; // 向上偏移更多
        pepe.style.top = `calc(${pepe.style.top} + ${offsetY}px)`;
        
        // 随机大小，在点击位置的硬币稍微大一些，更有爆炸感
        const size = Math.random() * 40 + 25; // 25-65px
        pepe.style.width = size + 'px';
        pepe.style.height = size + 'px';
        
        // 随机动画持续时间 (3-5秒)
        const duration = Math.random() * 2 + 3;
        
        // 每个PEPE摆动的速度和频率略有不同
        const swayDuration = Math.random() * 1.5 + 2;
        pepe.style.animationDuration = `${duration}s, ${swayDuration}s`;
        
        // 随机初始旋转角度
        const initialRotation = Math.random() * 360;
        pepe.style.transform = `rotate(${initialRotation}deg)`;
        
        // 随机延迟，让硬币不会同时下落
        const delay = Math.random() * 0.5; // 缩短延迟，让爆炸效果更明显
        pepe.style.animationDelay = `${delay}s, 0s`;
        
        // 随机旋转方向和摆动方向
        if (Math.random() > 0.5) {
            pepe.style.animationDirection = 'normal, alternate';
        } else {
            pepe.style.animationDirection = 'normal, alternate-reverse';
        }
        
        document.body.appendChild(pepe);
        
        // 动画结束后移除元素
        setTimeout(() => {
            pepe.remove();
        }, (duration + delay) * 1000);
    }
    
    // 为每个元素添加点击事件
    allClickableElements.forEach(element => {
        element.addEventListener('click', function(e) {
            // 阻止默认行为，防止立即跳转
            e.preventDefault();
            
            // 找到被点击的元素 - 可能是a标签或其内部的svg/path等
            const clickedElement = e.currentTarget;
            
            // 创建随机数量的PEPE
            const pepeCount = Math.floor(Math.random() * 8) + 12; // 12-19个PEPE
            
            for (let i = 0; i < pepeCount; i++) {
                createFallingPepe(e, clickedElement);
            }
            
            // 显示消息
            followMessage.classList.add('show');
            
            // 5秒后隐藏消息，与动画持续时间相匹配
            setTimeout(() => {
                followMessage.classList.remove('show');
            }, 5000);
            
            // 延迟后跳转到原链接
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                setTimeout(() => {
                    window.open(href, '_blank');
                }, 1500);
            }
        });
    });
});
