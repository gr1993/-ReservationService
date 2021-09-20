resource "aws_s3_bucket" "b" {
  bucket = var.domain_url
  policy = file("s3Policy.json")

  website {
    index_document = "index.html"
  }
}