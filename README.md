## 📌 Git 작업 흐름 요약

※ 본인 브랜치명이 `PSH`일 경우

```bash
1. git clone https://github.com/팀이름/project-name.git
2. cd project-name
3. git checkout -b PSH origin/PSH
4. git checkout main
5. git pull origin main
6. git checkout PSH
7. git merge main

8. 작업
9. git add .
10. git commit -m "[250710] feat: 메인 페이지 레이아웃 구현"
11. git push origin PSH

12. GitHub에서 PR 생성
13. 팀장이 PR 병합 (Squash and Merge)

14. git checkout main
15. git pull origin main
16. git checkout PSH
17. git merge main
```

---

## ✅1. 저장소 클론 및 브랜치 설정

### 🔹 1) 저장소 클론 받기

```bash
git clone https://github.com/팀이름/project-name.git
cd project-name
```

### 🔹 2) 자신의 브랜치로 전환 (팀장이 미리 만든 브랜치 사용)

- 미리 생성되어 있는 자신의 이니셜 브랜치를 사용하세요! (ex- 박서현 → `PSH`)

```bash
git checkout -b PSH origin/PSH
```

---

## ✅ 2. 작업 전 항상 main 최신화

모든 작업 전에는 항상 **main 브랜치를 최신 상태로 유지**해야 합니다.

```bash
git checkout main
git pull origin main
git checkout PSH
git merge main
```

---

## ✅ 3. 코드 작업 → 커밋 → 푸시

### 🔹 1) 코드 작업

코드를 작성하거나 수정하세요.

### 🔹 2) 커밋하기

```bash
git add .
git commit -m "[250710] feat: 메인 페이지 레이아웃 구현"
```

> 커밋 메시지 규칙 예시:
> 
> - `feat`: 새로운 기능
> - `fix`: 버그 수정
> - `style`: 스타일 변경
> - `refactor`: 코드 개선
> - `docs`: 문서 수정

### 🔹 3) 푸시하기

```bash
git push origin PSH
```

---

## ✅ 4. PR(Pull Request) 보내기

1. GitHub에서 레포지터리 저장소 접속
2. 상단 `Pull Requests` → `New Pull Request`
3. **base**: `main` / **compare**: `본인브랜치`
4. 제목과 설명 작성
    
    <aside>
    📌
    
    예시)
    
    - **제목**: `JYS | 메인 페이지 Hero 섹션 구현`
    - **본문**:
        
        > 반응형 구현 완료버튼 컴포넌트 공용화함
        🙏 리뷰 부탁드립니다!
        > 
    </aside>
    

---

## ✅ 5. 팀장이 PR 리뷰 후 main에 병합 (merge)

### 병합 방식 추천: `Squash and merge`

- 커밋을 하나로 합쳐서 main 브랜치가 깔끔해짐
- 병합 후 자동으로 브랜치 삭제 설정 가능

---

## ✅ 6. 병합된 후 각자 로컬에 main 업데이트 필수!

main이 병합되었더라도 본인 로컬 main은 아직 이전 상태입니다. **꼭 main을 최신화하세요!**

```bash
git checkout main
git pull origin main
git checkout PSH
git merge main
```
