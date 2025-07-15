# DevPuppy 아키텍처 다이어그램

## 1. 전체 시스템 아키텍처

```mermaid
graph TB
    subgraph "로컬 개발 환경"
        DEV[개발자 컴퓨터]
        LOCAL[npm run dev<br/>localhost:3000]
        BUILD[npm run build<br/>정적 파일 생성]
    end
    
    subgraph "AWS 클라우드"
        S3[S3 버킷<br/>devpuppy-dev-website<br/>정적 파일 저장]
        CF[CloudFront<br/>CDN 배포<br/>전 세계 캐싱]
        TERRAFORM[Terraform<br/>인프라 관리]
    end
    
    subgraph "사용자"
        USER[웹 브라우저]
        INTERNET[인터넷]
    end
    
    DEV --> LOCAL
    DEV --> BUILD
    BUILD --> |aws s3 sync| S3
    TERRAFORM --> |관리| S3
    TERRAFORM --> |관리| CF
    S3 --> CF
    USER --> INTERNET
    INTERNET --> CF
    CF --> |빠른 응답| USER
    
    style LOCAL fill:#e1f5fe
    style S3 fill:#fff3e0
    style CF fill:#f3e5f5
    style USER fill:#e8f5e8
```

## 2. 개발 vs 배포 비교

```mermaid
graph LR
    subgraph "개발 모드 (npm run dev)"
        DEV_CODE[소스 코드<br/>.tsx, .css]
        DEV_SERVER[Next.js 개발 서버<br/>실시간 컴파일]
        DEV_BROWSER[브라우저<br/>localhost:3000]
        
        DEV_CODE --> DEV_SERVER
        DEV_SERVER --> DEV_BROWSER
    end
    
    subgraph "배포 모드 (정적 사이트)"
        PROD_CODE[소스 코드<br/>.tsx, .css]
        BUILD_PROCESS[npm run build<br/>정적 파일 생성]
        STATIC_FILES[정적 파일<br/>.html, .css, .js]
        S3_STORAGE[S3 저장소]
        CDN[CloudFront CDN]
        PROD_BROWSER[브라우저<br/>전 세계 접근]
        
        PROD_CODE --> BUILD_PROCESS
        BUILD_PROCESS --> STATIC_FILES
        STATIC_FILES --> S3_STORAGE
        S3_STORAGE --> CDN
        CDN --> PROD_BROWSER
    end
    
    style DEV_SERVER fill:#ffcdd2
    style BUILD_PROCESS fill:#c8e6c9
    style STATIC_FILES fill:#fff9c4
    style CDN fill:#e1bee7
```

## 3. 파일 흐름 다이어그램

```mermaid
flowchart TD
    START[코드 작성] --> DEV_TEST{로컬 테스트}
    DEV_TEST --> |npm run dev| LOCAL_SERVER[개발 서버<br/>localhost:3000]
    DEV_TEST --> |npm run build| BUILD_STATIC[정적 파일 생성<br/>out/ 폴더]
    
    BUILD_STATIC --> UPLOAD[aws s3 sync<br/>S3 업로드]
    UPLOAD --> S3_BUCKET[S3 버킷<br/>devpuppy-dev-website]
    S3_BUCKET --> CLOUDFRONT[CloudFront 배포]
    CLOUDFRONT --> LIVE_SITE[라이브 웹사이트<br/>https://d2r7plyodhz64f.cloudfront.net]
    
    LOCAL_SERVER --> |개발 완료| DEV_TEST
    
    style START fill:#e3f2fd
    style LOCAL_SERVER fill:#fff3e0
    style BUILD_STATIC fill:#f1f8e9
    style LIVE_SITE fill:#fce4ec
```

## 4. 기술 스택

```mermaid
graph TB
    subgraph "프론트엔드"
        NEXTJS[Next.js 15]
        REACT[React]
        TYPESCRIPT[TypeScript]
        TAILWIND[Tailwind CSS]
    end
    
    subgraph "인프라 (AWS)"
        S3_TECH[S3<br/>정적 호스팅]
        CF_TECH[CloudFront<br/>CDN]
        TERRAFORM_TECH[Terraform<br/>IaC]
    end
    
    subgraph "개발 도구"
        NODE[Node.js 20]
        NPM[npm]
        GIT[Git/GitHub]
    end
    
    NEXTJS --> REACT
    NEXTJS --> TYPESCRIPT
    NEXTJS --> TAILWIND
    
    S3_TECH --> CF_TECH
    TERRAFORM_TECH --> S3_TECH
    TERRAFORM_TECH --> CF_TECH
    
    NODE --> NPM
    NPM --> NEXTJS
    GIT --> TERRAFORM_TECH
```

## 5. 향후 CI/CD 계획

```mermaid
graph LR
    subgraph "현재 (수동 배포)"
        MANUAL_BUILD[로컬 빌드<br/>npm run build]
        MANUAL_UPLOAD[수동 업로드<br/>aws s3 sync]
    end
    
    subgraph "향후 (자동 CI/CD)"
        GITHUB[GitHub Push]
        CODEPIPELINE[CodePipeline<br/>파이프라인 관리]
        CODEBUILD[CodeBuild<br/>자동 빌드]
        AUTO_DEPLOY[자동 배포<br/>S3 + CloudFront]
        
        GITHUB --> CODEPIPELINE
        CODEPIPELINE --> CODEBUILD
        CODEBUILD --> AUTO_DEPLOY
    end
    
    MANUAL_BUILD --> MANUAL_UPLOAD
    
    style MANUAL_BUILD fill:#ffcdd2
    style MANUAL_UPLOAD fill:#ffcdd2
    style GITHUB fill:#c8e6c9
    style AUTO_DEPLOY fill:#c8e6c9
```

---

## 요약

**현재 상태**: 정적 사이트 생성 → S3 저장 → CloudFront 배포 ✅  
**다음 단계**: GitHub 연동 자동 CI/CD 파이프라인 구축 🚀  
**최종 목표**: 코드 푸시 → 자동 빌드 → 자동 배포 🎯
