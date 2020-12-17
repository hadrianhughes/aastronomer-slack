from .index import handler
import base64


def test_success():
    event = {
        'body': base64.b64encode(b'text=Hello World!').decode('utf-8') + '=='
    }

    response = handler(event, {})

    assert response['statusCode'] == 200
    assert response['body'] == 'Subscribed to Hello World!'


def test_no_args():
    response = handler({}, {})

    assert response['statusCode'] == 200
    assert response['body'] == 'Need a postcode'
