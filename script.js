// ملف JavaScript الرئيسي لموقع سباك جدة

document.addEventListener('DOMContentLoaded', function() {
    // زر التمرير لأعلى الصفحة
    const scrollTopBtn = document.querySelector('.scroll-to-top');
    
    if (scrollTopBtn) {
        // إظهار أو إخفاء زر التمرير لأعلى عند التمرير
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollTopBtn.style.display = 'block';
            } else {
                scrollTopBtn.style.display = 'none';
            }
        });
        
        // التمرير لأعلى الصفحة عند النقر على الزر
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // تأثيرات التمرير للعناصر
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    if (animateElements.length > 0) {
        // دالة للتحقق مما إذا كان العنصر مرئيًا في نافذة العرض
        function isElementInViewport(el) {
            const rect = el.getBoundingClientRect();
            return (
                rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
                rect.bottom >= 0
            );
        }
        
        // دالة لإضافة فئة 'visible' للعناصر المرئية
        function handleScrollAnimation() {
            animateElements.forEach(function(element) {
                if (isElementInViewport(element)) {
                    element.classList.add('visible');
                }
            });
        }
        
        // تشغيل الدالة عند التمرير وعند تحميل الصفحة
        window.addEventListener('scroll', handleScrollAnimation);
        handleScrollAnimation(); // تشغيل مرة واحدة عند تحميل الصفحة
    }
    
    // تبديل قائمة التنقل المتجاوبة
    const menuButton = document.querySelector('.mobile-menu-button');
    const mainNavigation = document.querySelector('.main-navigation');
    
    if (menuButton && mainNavigation) {
        menuButton.addEventListener('click', function() {
            mainNavigation.classList.toggle('active');
            menuButton.classList.toggle('active');
        });

        // إغلاق القائمة عند النقر خارجها
        document.addEventListener('click', function(event) {
            if (!mainNavigation.contains(event.target) && !menuButton.contains(event.target) && mainNavigation.classList.contains('active')) {
                mainNavigation.classList.remove('active');
                menuButton.classList.remove('active');
            }
        });

        // إغلاق القائمة عند النقر على أي رابط فيها
        mainNavigation.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function() {
                mainNavigation.classList.remove('active');
                menuButton.classList.remove('active');
            });
        });
    }
    
    // تحريك سلس للروابط الداخلية
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // إضافة تأثيرات للخدمات عند التحويم
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(function(card) {
        card.addEventListener('mouseenter', function() {
            this.classList.add('hovered');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('hovered');
        });
    });
    
    // تحميل الصور بشكل كسول (lazy loading)
    if ('loading' in HTMLImageElement.prototype) {
        // استخدام خاصية loading="lazy" المدمجة في المتصفح
        const lazyImages = document.querySelectorAll('img.lazy');
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
        });
    } else {
        // استخدام Intersection Observer للمتصفحات القديمة
        const lazyImageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.classList.remove('lazy');
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img.lazy');
        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    }
});