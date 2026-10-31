import React, { useState } from 'react';
import { Code2, Copy, Check, Terminal, FileCode2, Sparkles, Layers } from 'lucide-react';

interface CodeSnippet {
  id: string;
  title: string;
  filename: string;
  category: string;
  description: string;
  code: string;
}

const SNIPPETS: CodeSnippet[] = [
  {
    id: 'eda_pipeline',
    title: 'Automated Data Hygiene & Outlier Imputer',
    filename: 'data_cleaning_pipeline.py',
    category: 'Pandas & NumPy',
    description: 'Vectorized outlier clipping using Interquartile Range (IQR) and median imputation across skewed numeric distributions.',
    code: `import numpy as np
import pandas as pd
from typing import List, Dict

def sanitize_telemetry_batch(df: pd.DataFrame, num_cols: List[str]) -> pd.DataFrame:
    """
    Cleans incoming batch feeds: deduplicates rows, trims IQR outliers,
    and imputes missing values using group-wise medians.
    """
    clean_df = df.copy().drop_duplicates(subset=['session_id'])
    
    # 1. Statistical Outlier Boundaries via IQR
    for col in num_cols:
        q25 = clean_df[col].quantile(0.25)
        q75 = clean_df[col].quantile(0.75)
        iqr = q75 - q25
        lower_bound = max(0, q25 - 1.5 * iqr)
        upper_bound = q75 + 1.5 * iqr
        
        # Clip extreme operational spikes without discarding records
        clean_df[col] = clean_df[col].clip(lower=lower_bound, upper=upper_bound)
        
    # 2. Impute Null Values using category medians
    if 'region' in clean_df.columns:
        clean_df[num_cols] = clean_df.groupby('region')[num_cols].transform(
            lambda grp: grp.fillna(grp.median())
        )
    
    return clean_df.dropna(subset=['user_id', 'timestamp'])
`,
  },
  {
    id: 'yolo_fastapi',
    title: 'Vision AI Inference Endpoint (Food Detecto)',
    filename: 'food_detection_service.py',
    category: 'YOLOv8 & FastAPI',
    description: 'Asynchronous computer vision inference serving sub-second food classification and nutritional macro calculation.',
    code: `from fastapi import FastAPI, UploadFile, HTTPException
from ultralytics import YOLO
import cv2
import numpy as np
from pydantic import BaseModel
from typing import List, Dict

app = FastAPI(title="Food Detecto Vision API")
model = YOLO("weights/food_detecto_yolov8n.pt")

class NutrientProfile(BaseModel):
    dish_name: str
    confidence: float
    calories: int
    protein_g: float
    carbs_g: float
    fat_g: float

@app.post("/api/v1/classify", response_model=List[NutrientProfile])
async def detect_food_items(file: UploadFile):
    # Read and decode incoming image buffer into OpenCV matrix
    image_bytes = await file.read()
    nparr = np.frombuffer(image_bytes, np.uint8)
    image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    
    if image is None:
        raise HTTPException(status_code=400, detail="Corrupted image payload")

    # Run inference with confidence threshold 0.65
    results = model.predict(source=image, conf=0.65, imgsz=640)
    detected_items = []
    
    for box in results[0].boxes:
        cls_id = int(box.cls[0].item())
        conf = float(box.conf[0].item())
        dish = model.names[cls_id]
        
        # Query verified USDA nutritional database mapping
        macros = fetch_macro_lookup(dish)
        detected_items.append(NutrientProfile(
            dish_name=dish,
            confidence=round(conf, 3),
            **macros
        ))
        
    return detected_items
`,
  },
  {
    id: 'rag_eval',
    title: 'Vector Search & Guardrail Evaluator',
    filename: 'rag_guardrail_evaluator.py',
    category: 'GenAI & RAG',
    description: 'High-dimensional cosine similarity vector search with automated prompt injection sanitization.',
    code: `from sentence_transformers import SentenceTransformer
import chromadb
import re
from typing import List, Optional

class KnowledgeRetriever:
    def __init__(self, collection_name: str = "enterprise_kb"):
        self.encoder = SentenceTransformer("all-MiniLM-L6-v2")
        self.client = chromadb.Client()
        self.collection = self.client.get_or_create_collection(collection_name)
        
    def sanitize_user_input(self, prompt: str) -> str:
        """Strips adversarial system prompts and escape characters."""
        disallowed = [r"(?i)system\\s+override", r"(?i)ignore\\s+previous", r"(?i)print\\s+api_key"]
        for pattern in disallowed:
            prompt = re.sub(pattern, "[FILTERED_INJECTION]", prompt)
        return prompt.strip()

    def query_context(self, user_query: str, top_k: int = 3) -> List[str]:
        sanitized = self.sanitize_user_input(user_query)
        query_vector = self.encoder.encode([sanitized]).tolist()[0]
        
        # Perform cosine nearest-neighbor retrieval
        results = self.collection.query(
            query_embeddings=[query_vector],
            n_results=top_k
        )
        return results["documents"][0] if results["documents"] else []
`,
  }
];

export const CodeInspector: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('eda_pipeline');
  const [copied, setCopied] = useState<boolean>(false);

  const currentSnippet = SNIPPETS.find((s) => s.id === activeTab) || SNIPPETS[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto rounded-2xl border border-black/10 dark:border-white/10 bg-white/95 dark:bg-[#0c0d12]/95 backdrop-blur-xl shadow-2xl overflow-hidden select-none transition-all">
      
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 border-b border-black/10 dark:border-white/10 bg-neutral-100/70 dark:bg-white/[0.02]">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-accent/20 text-emerald-800 dark:text-accent">
            <Terminal className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-white">
                Technical Code Inspector
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent/20 text-emerald-800 dark:text-accent font-mono font-medium">
                Production Implementations
              </span>
            </div>
            <p className="text-[10px] text-neutral-500 font-mono hidden sm:block">
              Inspect verified Python, Pandas, YOLOv8, and RAG architectures written by Abhilash
            </p>
          </div>
        </div>

        {/* Copy Code Button */}
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 transition-all active:scale-95"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-accent" />
              <span className="text-accent font-medium">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Code</span>
            </>
          )}
        </button>
      </div>

      {/* Snippet Switcher Bar */}
      <div className="flex flex-wrap items-center gap-2 px-5 py-3 border-b border-black/10 dark:border-white/10 bg-neutral-50/50 dark:bg-black/30">
        {SNIPPETS.map((snippet) => (
          <button
            key={snippet.id}
            type="button"
            onClick={() => setActiveTab(snippet.id)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              activeTab === snippet.id
                ? 'bg-neutral-900 text-white dark:bg-white dark:text-black font-semibold shadow-sm'
                : 'text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
            }`}
          >
            <FileCode2 className="w-3.5 h-3.5" />
            <span>{snippet.filename}</span>
            <span className="text-[10px] opacity-70 hidden sm:inline">
              ({snippet.category})
            </span>
          </button>
        ))}
      </div>

      {/* Snippet Description */}
      <div className="px-5 py-2.5 bg-black/[0.02] dark:bg-white/[0.01] border-b border-black/5 dark:border-white/5 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-neutral-600 dark:text-neutral-400 gap-2">
        <span className="font-sans font-medium text-neutral-800 dark:text-neutral-200">
          {currentSnippet.title}:
        </span>
        <span className="text-neutral-500 font-sans text-xs">
          {currentSnippet.description}
        </span>
      </div>

      {/* Syntax Highlighted Code Viewer */}
      <div className="p-4 sm:p-5 overflow-x-auto bg-[#07080b] text-neutral-200 font-mono text-xs leading-relaxed max-h-[380px] overflow-y-auto">
        <pre className="selection:bg-accent/30 selection:text-white">
          <code>{currentSnippet.code}</code>
        </pre>
      </div>

      {/* Bottom Telemetry Bar */}
      <div className="flex items-center justify-between px-5 py-2.5 border-t border-black/10 dark:border-white/10 bg-neutral-100/50 dark:bg-white/[0.01] text-[11px] font-mono text-neutral-500">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-accent" />
          <span>Language: Python 3.11+ / Type-Annotated PEP 484</span>
        </div>
        <span className="text-neutral-400">Production Verified</span>
      </div>

    </div>
  );
};
