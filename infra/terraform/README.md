# DevPuppy Infrastructure

AWS 인프라를 관리하는 Terraform 설정입니다.

## 구조

```
terraform/
├── main.tf                 # 메인 Terraform 설정
├── variables.tf            # 변수 정의
├── outputs.tf              # 출력값
├── modules/                # 재사용 가능한 모듈
│   ├── static-site/        # S3 + CloudFront 정적 사이트
│   └── cicd/              # CodeBuild + CodePipeline
└── README.md              # 이 파일
```

## 환경 관리

브랜치 기반으로 환경을 구분합니다:

- **dev 브랜치** → `devpuppy-dev` workspace (개발 환경)
- **main 브랜치** → `devpuppy-prod` workspace (운영 환경)

## Terraform Cloud 설정

### Workspace 설정
```
Organization: jsw4562
Workspace: devpuppy-dev (dev 브랜치용)
Working Directory: infra/terraform
Trigger Pattern: infra/**/*
```

### 환경 변수
**Environment Variables:**
- `AWS_ACCESS_KEY_ID` (sensitive)
- `AWS_SECRET_ACCESS_KEY` (sensitive)
- `AWS_DEFAULT_REGION`: `ap-northeast-2`

**Terraform Variables:**
- `aws_region`: `ap-northeast-2`
- `app_name`: `devpuppy`
- `github_owner`: `KingZuto`
- `github_repo`: `devpuppy`
- `github_branch`: `dev` (또는 `main`)
- `github_token`: GitHub Personal Access Token (sensitive)

## 자동 배포

- **PR 생성** → `terraform plan` 자동 실행
- **PR merge** → `terraform apply` 자동 실행
