use tauri_plugin_sql::{Builder as SqlBuilder, Migration, MigrationKind};

mod parser;

const MIGRATION_001: &str = include_str!("../migrations/0001_init.sql");

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_notification::init())
        .plugin(
            SqlBuilder::default()
                .add_migrations(
                    "sqlite:terouva.db",
                    vec![Migration {
                        version: 1,
                        description: "init schema",
                        sql: MIGRATION_001,
                        kind: MigrationKind::Up,
                    }],
                )
                .build(),
        )
        .invoke_handler(tauri::generate_handler![
            parser::parse_listing_url,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
