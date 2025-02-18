# Device Metrics API

This API endpoint allows authenticated users to retrieve metric data from their devices.

## Endpoint

```
GET /api/devices/[id]/metrics
```

## Authentication

This endpoint requires authentication using NextAuth.js. Include your authentication token in the request headers.

## URL Parameters

- `id`: The ID of the device to retrieve metrics from (required)

## Query Parameters

- `type`: (optional) Filter metrics by type. Valid values:
  - `temperature`
  - `humidity`
  - `pressure`
  - `battery`
- `startDate`: (optional) ISO datetime string to filter metrics from this date
- `endDate`: (optional) ISO datetime string to filter metrics until this date

## Response Format

### Success Response (200 OK)

```json
{
  "metrics": [
    {
      "deviceId": "string",
      "type": "string",
      "value": "number",
      "timestamp": "string (ISO datetime)"
    }
  ]
}
```

### Error Responses

- `401 Unauthorized`: Authentication required
- `400 Bad Request`: Invalid device ID or query parameters
- `404 Not Found`: Device not found or unauthorized access

## Example Requests

1. Get all metrics for a device:

```
GET /api/devices/123456/metrics
```

2. Get temperature metrics within a date range:

```
GET /api/devices/123456/metrics?type=temperature&startDate=2024-03-01T00:00:00Z&endDate=2024-03-02T00:00:00Z
```

## Rate Limiting

The endpoint is limited to 1000 records per request. Use date ranges to paginate through larger datasets.

## Error Handling

The API returns appropriate HTTP status codes and error messages in the following format:

```json
{
  "error": "Error message description"
}
```
