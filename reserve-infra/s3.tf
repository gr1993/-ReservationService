resource "aws_s3_bucket" "b" {
  bucket = "reserve-bucket-pgr"
  policy = file("s3Policy.json")

  website {
    index_document = "index.html"
  }
}