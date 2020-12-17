from urllib.parse import parse_qs


def handler(event: dict, context: dict) -> dict:
    body_formdata = event.get('body', {})
    body = parse_qs(body_formdata)
    text = body.get('text')

    return {
        'statusCode': 200,
        'body': text[0] if text else 'Need a postcode'
    }
