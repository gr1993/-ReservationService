variable "domain_url" {
  type     = string
  default  = "koraili.shop"
}

variable "ami_id" {
  type     = string
  default  = "ami-082c677f74018d4e9"
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