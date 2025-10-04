use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct ClashStatus {
    pub clash_running: bool,
    pub verge_running: bool,
    pub active_port: Option<u16>,
}
