use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct MultiDeskConfig {
    #[serde(rename = "Servers")]
    pub servers: Servers,

    #[serde(rename = "Settings", skip_serializing_if = "Option::is_none")]
    pub settings: Option<serde_json::Value>,

    #[serde(rename = "ExternalTools", skip_serializing_if = "Option::is_none")]
    pub external_tools: Option<ExternalTools>,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Servers {
    #[serde(rename = "Group")]
    pub groups: Vec<Group>,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Group {
    #[serde(rename = "Properties")]
    pub properties: GroupProperties,

    #[serde(rename = "Server")]
    pub servers: ServerOrList,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
#[serde(untagged)]
pub enum ServerOrList {
    Single(Server),
    Multiple(Vec<Server>),
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct GroupProperties {
    #[serde(rename = "Name")]
    pub name: String,

    #[serde(rename = "InheritProxy")]
    pub inherit_proxy: i32,

    #[serde(rename = "ProxyType")]
    pub proxy_type: i32,

    #[serde(rename = "SocksHostname")]
    pub socks_hostname: String,

    #[serde(rename = "SocksPort")]
    pub socks_port: u16,

    #[serde(rename = "SocksUserName")]
    pub socks_username: String,

    #[serde(rename = "SocksPassword")]
    pub socks_password: String,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Server {
    #[serde(rename = "Name")]
    pub name: String,

    #[serde(rename = "Server")]
    pub server: String,

    #[serde(rename = "InheritProxy")]
    pub inherit_proxy: i32,

    #[serde(rename = "ProxyType")]
    pub proxy_type: i32,

    #[serde(rename = "SocksPort")]
    pub socks_port: u16,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct ExternalTools {
    #[serde(rename = "ExternalTool")]
    pub tools: Vec<ExternalTool>,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct ExternalTool {
    #[serde(rename = "Title")]
    pub title: String,

    #[serde(rename = "Command")]
    pub command: String,
}
