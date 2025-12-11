'use client';

import { useEffect, useState } from 'react';

interface SmilesViewerProps {
  smiles: string | unknown;
  width?: number;
  height?: number;
  className?: string;
}

export default function SmilesViewer({
  smiles,
  width = 400,
  height = 300,
  className = ''
}: SmilesViewerProps) {
  const [svg, setSvg] = useState<string>('');
  const [error, setError] = useState<string>('');

  // Convert smiles to string if needed
  const smilesString = typeof smiles === 'string' ? smiles : String(smiles || '');

  useEffect(() => {
    let mounted = true;

    async function renderMolecule() {
      try {
        if (!smilesString) return;

        // Dynamically import OpenChemLib
        const OCL = await import('openchemlib');

        if (!mounted) return;

        // Parse SMILES
        const molecule = OCL.Molecule.fromSmiles(smilesString);

        if (!molecule) {
          setError('Invalid SMILES string');
          return;
        }

        // Generate SVG
        const svgString = molecule.toSVG(width, height, undefined, {
          autoCrop: true,
          autoCropMargin: 20,
          suppressChiralText: false,
          suppressESR: false,
          suppressCIPParity: false,
          noStereoProblem: false,
          factorTextSize: 1.0
        });

        if (mounted) {
          setSvg(svgString);
          setError('');
        }
      } catch (err) {
        console.error('Error rendering SMILES:', err);
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Failed to render molecule');
        }
      }
    }

    renderMolecule();

    return () => {
      mounted = false;
    };
  }, [smilesString, width, height]);

  if (!smiles) {
    return (
      <div className="flex items-center justify-center bg-gray-100 rounded p-4">
        <p className="text-gray-500 text-sm">No SMILES string provided</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center bg-red-50 border border-red-200 rounded p-4">
        <p className="text-red-600 text-sm">{error}</p>
      </div>
    );
  }

  if (!svg) {
    return (
      <div className="flex items-center justify-center bg-gray-100 rounded p-4" style={{ width, height }}>
        <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div
      className={`inline-block border border-gray-200 rounded bg-white ${className}`}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
