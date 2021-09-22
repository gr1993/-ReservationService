# 인프라 구축 방법

`테라폼`을 이용하여 인프라 구축한 후 아래와 같은 절차가 존재합니다.

```bash
terraform init
terraform plan
terraform apply
```

1. 생성된 S3에 build된 Front 소스 업로드하기
	* s3명은 사용하는 도메인과 일치해야함
	* aws s3 sync . s3://[s3명]/
2. 서버 코드배포
	* AMI 만들기(밑에 예시)
	* codedeploy배포 만들 때 git과 codeDeploy서비스를 연동
	* appspec.yml 작성(서버 소스쪽에 파일 있음)
3. rds, elasticCache(redis)는 별도로 콘솔로 생성하였습니다.
4. chrome 정책상 api서버는 인증서를 부착하였으며 프론트에서 요청 시 https, wss 처리하였습니다.
	* acm 인증서 추가
	* alb 인증서 부착


> AMI 환경 셋팅 명령어

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
. ~/.nvm/nvm.sh
nvm install node
sudo yum install ruby
wget https://aws-codedeploy-ap-northeast-2.s3.amazonaws.com/latest/install
chmod +x ./install
sudo ./install auto
sudo service codedeploy-agent status
sudo amazon-linux-extras install -y nginx1
nginx -v
sudo service nginx start
```