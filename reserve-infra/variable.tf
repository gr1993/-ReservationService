variable "domain_url" {
  type     = string
  default  = "koraili.shop"
}

variable "ami_id" {
  type     = string
  default  = "ami-0c096e23886e1e7b3"
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