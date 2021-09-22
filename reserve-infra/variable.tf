variable "domain_url" {
  type     = string
  default  = "koraili.shop"
}

variable "ami_id" {
  type     = string
  default  = "ami-06a8002305eaadd22"
}

variable "key_name" {
  type     = string
  default  = "pgr-key"
}

variable "instance_type" {
  type     = string
  default  = "t2.micro"
}

variable "desired_capacity" {
  type     = number
  default  = 1
}

variable "max_size" {
  type     = number
  default  = 1
}

variable "min_size" {
  type     = number
  default  = 1
}

variable "vpc_id" {
  type     = string
  default  = "vpc-acbf79c7"
}

variable "subnet_ids" {
  type     = list(string)
  default  = ["subnet-6435c50f", "subnet-b5c696e9"]
}
