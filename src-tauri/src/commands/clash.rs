use crate::models::clash::ClashStatus;
use std::net::TcpListener;

#[tauri::command]
pub fn detect_clash_ports() -> Result<ClashStatus, String> {
    let clash_running = is_port_in_use(7890);
    let verge_running = is_port_in_use(7897);

    let active_port = if verge_running {
        Some(7897)
    } else if clash_running {
        Some(7890)
    } else {
        None
    };

    Ok(ClashStatus {
        clash_running,
        verge_running,
        active_port,
    })
}

fn is_port_in_use(port: u16) -> bool {
    TcpListener::bind(("127.0.0.1", port)).is_err()
}

#[tauri::command]
pub fn find_clash_install_path() -> Result<Vec<String>, String> {
    use std::path::PathBuf;

    let mut paths = Vec::new();

    #[cfg(target_os = "windows")]
    {
        let drives = vec!["C", "D", "E", "F"];
        let possible_paths = vec![
            "Program Files\\Clash",
            "Program Files\\Clash Verge",
            "Clash",
            "ClashVerge",
        ];

        for drive in drives {
            for path in &possible_paths {
                let full_path = format!("{}:\\{}", drive, path);
                if PathBuf::from(&full_path).exists() {
                    paths.push(full_path);
                }
            }
        }
    }

    #[cfg(not(target_os = "windows"))]
    {
        let possible_paths = vec![
            "/Applications/Clash.app",
            "/Applications/Clash Verge.app",
            "~/Applications/Clash.app",
        ];

        for path in possible_paths {
            let expanded_path = shellexpand::tilde(path).to_string();
            if PathBuf::from(&expanded_path).exists() {
                paths.push(expanded_path);
            }
        }
    }

    Ok(paths)
}
