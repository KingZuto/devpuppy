# DevPuppy

AWS 기반 Next.js 웹 애플리케이션 프로젝트

## 프로젝트 구조

```
devpuppy/
├── app/                    # Next.js 애플리케이션
│   ├── src/               # 소스 코드
│   ├── public/            # 정적 파일
│   ├── package.json       # 앱 의존성
│   └── ...               # Next.js 관련 설정 파일들
├── infra/                 # AWS 인프라 (Terraform)
│   └── terraform/         # Terraform 설정
│       ├── modules/       # 재사용 가능한 모듈
│       └── environments/  # 환경별 설정 (dev, prod)
├── docs/                  # 문서
├── buildspec.yml          # AWS CodeBuild 설정
└── README.md             # 프로젝트 개요
```

## 시작하기

### 애플리케이션 개발

```bash
cd app
npm install
npm run dev
```

[http://localhost:3000](http://localhost:3000)에서 결과를 확인할 수 있습니다.

### 인프라 관리

```bash
cd infra/terraform/environments/dev
terraform init
terraform plan
terraform apply
```

## 배포

AWS CodeBuild를 통한 자동 배포가 설정되어 있습니다. `buildspec.yml` 파일이 빌드 과정을 정의합니다.

## 더 알아보기

- [Next.js Documentation](https://nextjs.org/docs) - Next.js 기능과 API 학습
- [AWS Documentation](https://docs.aws.amazon.com/) - AWS 서비스 가이드
- [Terraform Documentation](https://www.terraform.io/docs) - 인프라 코드 관리
# 자동 배포 테스트 - Fri Aug  8 14:08:50 KST 2025
