# DevPuppy Terraform Infrastructure

이 디렉토리는 AWS Amplify를 사용한 DevPuppy 애플리케이션의 인프라를 관리합니다.

## 구조

```
terraform/
├── modules/
│   └── amplify/          # Amplify 모듈
├── environments/
│   ├── dev/              # 개발 환경
│   └── prod/             # 프로덕션 환경
├── terraform.tfvars.example
└── README.md
```

## 사전 준비

1. **AWS CLI 설정**
   ```bash
   aws configure
   ```

2. **Terraform 설치**
   ```bash
   brew install terraform  # macOS
   ```

3. **GitHub Personal Access Token 생성**
   - GitHub Settings > Developer settings > Personal access tokens
   - `repo` 권한 필요

## 설정

1. **환경 변수 파일 생성**
   ```bash
   cd terraform/environments/dev
   cp ../../terraform.tfvars.example terraform.tfvars
   ```

2. **terraform.tfvars 파일 수정**
   ```hcl
   github_repository = "https://github.com/YOUR_USERNAME/devpuppy"
   github_access_token = "ghp_your_token_here"
   ```

## 배포

### 개발 환경 배포
```bash
cd terraform/environments/dev
terraform init
terraform plan
terraform apply
```

### 프로덕션 환경 배포
```bash
cd terraform/environments/prod
terraform init
terraform plan
terraform apply
```

## 주요 기능

- **자동 빌드**: GitHub에 푸시하면 자동으로 빌드 및 배포
- **브랜치별 배포**: dev 브랜치는 개발 환경, main 브랜치는 프로덕션 환경
- **커스텀 도메인**: 선택적으로 커스텀 도메인 설정 가능
- **환경 변수**: 환경별로 다른 환경 변수 설정

## 출력 정보

배포 완료 후 다음 정보를 확인할 수 있습니다:
- `app_id`: Amplify 앱 ID
- `app_url`: 애플리케이션 URL
- `custom_domain_url`: 커스텀 도메인 URL (설정한 경우)
