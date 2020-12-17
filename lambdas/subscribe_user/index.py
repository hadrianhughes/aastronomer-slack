from urllib.parse import parse_qs
import base64


def handler(event: dict, context: dict) -> dict:
    body_base64 = event.get('body', '')
    body_formdata_bytes = base64.b64decode(body_base64)
    print(body_formdata_bytes)
    body_formdata = body_formdata_bytes.decode('utf-8')
    body = parse_qs(body_formdata)
    text = body.get('text')

    return {
        'statusCode': 200,
        'body': ('Subscribed to ' + text[0]) if text else 'Need a postcode'
    }
