// DOM이 완전히 로드된 후 실행
document.addEventListener('DOMContentLoaded', function() {
    
    const cards = document.querySelectorAll('.card');
    const overlay = document.getElementById('overlay');
    let activeCard = null;
    let clonedCard = null;  // 복제된 카드
    
    cards.forEach(function(card) {
        
        card.addEventListener('mouseenter', function(e) {
            if (activeCard) return;
            
            activeCard = this;
            
            // 카드 복제본 생성
            clonedCard = this.cloneNode(true);
            clonedCard.classList.add('card-clone');
            clonedCard.classList.remove('js-animation-start');
            document.body.appendChild(clonedCard);
            
            // 원본 카드 위치 계산
            const rect = this.getBoundingClientRect();
            clonedCard.style.position = 'fixed';
            clonedCard.style.top = rect.top + 'px';
            clonedCard.style.left = rect.left + 'px';
            clonedCard.style.width = rect.width + 'px';
            clonedCard.style.margin = '0';
            clonedCard.style.zIndex = '1000';
            
            // 원본 카드 표시
            this.style.opacity = '0.3';
            
            // 약간의 지연 후 중앙으로 이동 (애니메이션 효과)
            setTimeout(() => {
                clonedCard.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                clonedCard.style.top = '50%';
                clonedCard.style.left = '50%';
                clonedCard.style.transform = 'translate(-50%, -50%)';
                clonedCard.style.width = '300px';
                clonedCard.style.maxWidth = '90vw';
                
                // 이미지 확대
                const img = clonedCard.querySelector('img');
                if (img) {
                    img.style.transform = 'scale(1.5)';
                    img.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.25)';
                }
            }, 10);
            
            overlay.classList.add('active');
        });
    });

    // 오버레이 클릭 시 닫기
    overlay.addEventListener('click', closeCard);

    // ESC 키로 닫기
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && activeCard) {
            closeCard();
        }
    });
    // 화면 크기에 따른 카드 너비 계산
    let cardWidth;
    if (window.innerWidth < 768) {
        cardWidth = '150px';  // 모바일
    } else if (window.innerWidth < 992) {
        cardWidth = '200px';  // 태블릿
    } else {
        cardWidth = '250px';  // 데스크톱
    }

clonedCard.style.width = cardWidth;


    // 카드 닫기 함수
    function closeCard() {
        if (activeCard) {
            activeCard.style.opacity = '1';
            activeCard = null;
        }
        if (clonedCard) {
            clonedCard.remove();
            clonedCard = null;
        }
        overlay.classList.remove('active');
    }
    
    console.log('카드 애니메이션이 준비되었습니다!');
});


