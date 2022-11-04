resource "aws_apigatewayv2_api" "getallwastesocket" {
  name                       = "getAllWasteSocket"
  protocol_type              = "WEBSOCKET"
  route_selection_expression = "$request.body.action"
}
