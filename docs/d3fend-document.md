# D3FEND Document

This is a sample document to demonstrate the use of D3FEND Mermaid.

The following diagram provides a high-level architecture of a web application where components are labeled with D3FEND security controls such as `d3f:User`, `d3f:WebServerApplication`, and `d3f:Database`.

```mermaid

graph LR;
u((User d3f:User))
api[REST API d3f:WebServerApplication]
database[MySQL d3f:Database]
u -->|d3f:WebResourceAccess| api
api -->|d3f:DatabaseQuery| database

subgraph DC1[DataCenter d3f:PhysicalLocation]
    api
    database
end
```

# A simple LAN / WAN

You can use different flowchart diagram types (e.g., `graph`, `flowchart-elk`, ...)

```mermaid
flowchart-elk LR

subgraph LAN1 [LAN d3f:Network]
s1[server d3f:Server]
s2[server d3f:Server]
s3[server d3f:Server]
router-1[d3f:Router]
end

subgraph LAN2 [LAN d3f:Network ]
wifi-ap[d3f:WirelessAccessPoint d3f:WirelessRouter]
laptop1[d3f:LaptopComputer]
laptop2[d3f:LaptopComputer]
desktop1[d3f:DesktopComputer]
mobile[d3f:TabletComputer]
end

subgraph remote [d3f:Network d3f:PhysicalLocation]
    vpn-terminator[d3f:EncryptedTunnels]
    desktop-remote[d3f:DesktopComputer]
end

router-0 --- vpn-server[d3f:VPNServer VPN]
router-0 --- router-1
router-0 --- wifi-ap
router-0[d3f:Firewall d3f:Router ]

vpn-server --- vpn-terminator

```