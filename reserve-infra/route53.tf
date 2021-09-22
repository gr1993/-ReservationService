resource "aws_route53_zone" "main" {
  name = var.domain_url
}

resource "aws_route53_record" "main" {
  zone_id = aws_route53_zone.main.zone_id
  name    = var.domain_url
  type    = "A"

  alias {
    name                   = aws_s3_bucket.b.website_domain
    zone_id                = aws_s3_bucket.b.hosted_zone_id
    evaluate_target_health = true
  }
}

resource "aws_route53_record" "api" {
  zone_id = aws_route53_zone.main.zone_id
  name    = "api.${var.domain_url}"
  type    = "A"

  alias {
    name                   = aws_lb.alb.dns_name
    zone_id                = aws_lb.alb.zone_id
    evaluate_target_health = false
  }
}