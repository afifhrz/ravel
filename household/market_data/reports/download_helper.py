import base64
import sys
import os

def decode_base64_file(input_path, output_path):
    """Decode a base64-encoded file to binary."""
    with open(input_path, 'r') as f:
        # Skip the JSON wrapper if present
        content = f.read()
        # Extract just the base64 part
        if content.startswith('{'):
            import json
            data = json.loads(content)
            b64 = data['result']
        else:
            b64 = content
        binary = base64.b64decode(b64)
    with open(output_path, 'wb') as f:
        f.write(binary)
    print(f"Decoded {len(binary)} bytes to {output_path}")

if __name__ == '__main__':
    if len(sys.argv) != 3:
        print("Usage: python download_helper.py <input_b64> <output_pdf>")
        sys.exit(1)
    decode_base64_file(sys.argv[1], sys.argv[2])
