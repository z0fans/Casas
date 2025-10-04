use crate::models::multidesk::{MultiDeskConfig, ServerOrList};
use std::fs;

#[tauri::command]
pub fn read_multidesk_config(path: String) -> Result<MultiDeskConfig, String> {
    let xml_content = fs::read_to_string(&path)
        .map_err(|e| format!("读取文件失败: {}", e))?;

    let config: MultiDeskConfig = quick_xml::de::from_str(&xml_content)
        .map_err(|e| format!("解析XML失败: {}", e))?;

    Ok(config)
}

#[tauri::command]
pub fn write_multidesk_config(path: String, config: MultiDeskConfig) -> Result<(), String> {
    let xml_content = quick_xml::se::to_string(&config)
        .map_err(|e| format!("序列化XML失败: {}", e))?;

    let full_xml = format!(
        "<?xml version=\"1.0\" encoding=\"utf-8\" standalone=\"yes\"?>\n{}",
        xml_content
    );

    fs::write(&path, full_xml).map_err(|e| format!("写入文件失败: {}", e))?;

    Ok(())
}

#[tauri::command]
pub fn auto_configure_proxy(
    config: MultiDeskConfig,
    active_port: u16,
) -> Result<MultiDeskConfig, String> {
    let mut new_config = config.clone();

    for group in &mut new_config.servers.groups {
        if group.properties.proxy_type == 1 {
            group.properties.socks_port = active_port;
        }

        if let ServerOrList::Multiple(ref mut servers) = group.servers {
            for server in servers {
                if server.inherit_proxy != 1 && server.proxy_type == 1 {
                    server.socks_port = active_port;
                }
            }
        }
    }

    Ok(new_config)
}
