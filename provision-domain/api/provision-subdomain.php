<?php
// Configuration
$domain = "example.com"; // Your main domain
$godaddy_key = "YOUR_GODADDY_API_KEY";
$godaddy_secret = "YOUR_GODADDY_API_SECRET";

// Get raw POST body
$input = json_decode(file_get_contents("php://input"), true);

if (!isset($input['subdomain']) || !isset($input['target'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing subdomain or target']);
    exit;
}

$subdomain = strtolower(preg_replace('/[^a-z0-9\-]/', '', $input['subdomain']));
$target = trim($input['target']);

// Determine record type
$recordType = filter_var($target, FILTER_VALIDATE_IP) ? 'A' : 'CNAME';

// DNS record
$record = [[
    "data" => $target,
    "name" => $subdomain,
    "ttl" => 600,
    "type" => $recordType
]];

$url = "https://api.godaddy.com/v1/domains/$domain/records/$recordType/$subdomain";

// cURL request
$ch = curl_init($url);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT");
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($record));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Authorization: sso-key $godaddy_key:$godaddy_secret",
    "Content-Type: application/json"
]);

$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

// Handle response
if ($http_code === 200) {
    echo json_encode(['success' => true, 'subdomain' => "$subdomain.$domain"]);
} else {
    http_response_code($http_code);
    echo json_encode(['error' => 'Failed to create subdomain', 'code' => $http_code, 'response' => $response]);
}
?>