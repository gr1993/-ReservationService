resource "aws_launch_configuration" "server" {
  name             = "web_server"
  image_id         = var.ami_id
  instance_type    = var.instance_type
	key_name         = var.key_name
	security_groups  = [aws_security_group.allow_http.id]
}

resource "aws_autoscaling_group" "asg_server" {
  availability_zones 		= ["ap-northeast-2a"]
  desired_capacity   		= var.desired_capacity
  max_size          		= var.max_size
  min_size          		= var.min_size
	launch_configuration	= aws_launch_configuration.server.name
}